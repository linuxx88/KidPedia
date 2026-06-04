import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

interface GitCommit {
  hash: string;
  author: string;
  date: string;
  subject: string;
}

interface GitData {
  branch: string;
  status: string;
  commits: GitCommit[];
}

interface CodeNodeInfo {
  id: string;
  type: string;
  data: {
    label: string;
    path: string;
    group: string;
  };
  position: { x: number; y: number };
}

interface CodeEdgeInfo {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

function getGitData(): Promise<GitData> {
  return new Promise((resolve) => {
    exec('git log -n 25 --pretty=format:"%h|%an|%ad|%s" --date=short', (err, logOut) => {
      if (err) {
        return resolve({ branch: 'unknown', status: '', commits: [] });
      }
      exec('git branch --show-current', (_, branchOut) => {
        const branch = branchOut.trim() || 'main';
        exec('git status --short', (_, statusOut) => {
          const status = statusOut.trim();
          const commits = logOut.split('\n').filter(Boolean).map(line => {
            const [hash, author, date, subject] = line.split('|');
            return { hash, author, date, subject };
          });
          resolve({ branch, status, commits });
        });
      });
    });
  });
}

function getCodeDeps(srcDir: string) {
  const files: string[] = [];
  function walk(dir: string) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git') {
          walk(fullPath);
        }
      } else if (/\.(ts|tsx|css)$/.test(file)) {
        files.push(fullPath);
      }
    }
  }
  
  if (fs.existsSync(srcDir)) {
    walk(srcDir);
  }

  const nodes: CodeNodeInfo[] = [];
  const edges: CodeEdgeInfo[] = [];
  const fileToId = new Map<string, string>();

  // Create nodes
  files.forEach((file, index) => {
    const relativePath = path.relative(srcDir, file);
    const id = `node-${index}`;
    fileToId.set(relativePath, id);
    
    // Group files by top-level dir
    let group = 'other';
    const parts = relativePath.split(path.sep);
    if (parts.length > 1) {
      group = parts[0];
    } else {
      if (relativePath.endsWith('.tsx') || relativePath.endsWith('.ts')) {
        group = 'root';
      }
    }

    nodes.push({
      id,
      type: 'codeNode',
      data: { 
        label: parts[parts.length - 1], 
        path: relativePath,
        group 
      },
      position: { x: 0, y: 0 }
    });
  });

  // Extract imports and create edges
  files.forEach((file) => {
    const relativePath = path.relative(srcDir, file);
    const fileId = fileToId.get(relativePath);
    if (!fileId) return;

    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      
      // Handle relative imports
      if (importPath.startsWith('.')) {
        const absoluteImportDir = path.dirname(file);
        const resolvedPath = path.resolve(absoluteImportDir, importPath);
        
        // Try file extensions
        let finalRelative = '';
        const extensions = ['.tsx', '.ts', '.css', '/index.tsx', '/index.ts'];
        for (const ext of extensions) {
          const testPath = ext.startsWith('/') ? path.join(resolvedPath, ext.substring(1)) : resolvedPath + ext;
          if (fs.existsSync(testPath)) {
            finalRelative = path.relative(srcDir, testPath);
            break;
          }
        }
        
        if (finalRelative && fileToId.has(finalRelative)) {
          const targetId = fileToId.get(finalRelative);
          if (targetId) {
            const edgeId = `edge-${fileId}-${targetId}`;
            if (!edges.some(e => e.id === edgeId)) {
              edges.push({
                id: edgeId,
                source: fileId,
                target: targetId,
                animated: true
              });
            }
          }
        }
      }
    }
  });

  return { nodes, edges };
}

export function devDashboardPlugin(): Plugin {
  const srcDir = path.resolve(process.cwd(), 'src');
  const tasksFilePath = path.resolve(process.cwd(), 'tasks.json');

  return {
    name: 'dev-dashboard-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        // GET /api/tasks
        if (req.url === '/api/tasks' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          if (fs.existsSync(tasksFilePath)) {
            res.end(fs.readFileSync(tasksFilePath, 'utf8'));
          } else {
            res.end(JSON.stringify({ nodes: [], edges: [] }));
          }
          return;
        }

        // POST /api/tasks
        if (req.url === '/api/tasks' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              fs.writeFileSync(tasksFilePath, body, 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              res.statusCode = 500;
              const msg = err instanceof Error ? err.message : String(err);
              res.end(JSON.stringify({ error: msg }));
            }
          });
          return;
        }

        // GET /api/git
        if (req.url === '/api/git' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          const gitData = await getGitData();
          res.end(JSON.stringify(gitData));
          return;
        }

        // GET /api/deps
        if (req.url === '/api/deps' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const deps = getCodeDeps(srcDir);
            res.end(JSON.stringify(deps));
          } catch (err) {
            res.statusCode = 500;
            const msg = err instanceof Error ? err.message : String(err);
            res.end(JSON.stringify({ error: msg }));
          }
          return;
        }

        next();
      });
    }
  };
}
