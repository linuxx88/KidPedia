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

interface TicketInfo {
  id: string;
  label: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'done';
  assignee?: string;
}

function parseTicketsFromMarkdown(filePath: string): TicketInfo[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const tickets: TicketInfo[] = [];
  
  const regex = /^\s*-\s*\[([\sxX/])\]\s*\*\*\*?\[([a-zA-Z0-9_-]+)\]\*\*\*?\s*([^|]+)(?:\|\s*priorit[eé]:\s*([^\s|]+))?(?:\s*\|\s*assign[eé]:\s*([^\s|]+))?/;
  
  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const statusChar = match[1].toLowerCase();
      let status: 'todo' | 'in_progress' | 'done' = 'todo';
      if (statusChar === '/' || statusChar === 'in_progress') status = 'in_progress';
      else if (statusChar === 'x') status = 'done';
      
      const id = match[2];
      const label = match[3].trim();
      
      let priority: 'high' | 'medium' | 'low' = 'medium';
      const priorityStr = (match[4] || '').trim().toLowerCase();
      if (priorityStr.includes('haut')) priority = 'high';
      else if (priorityStr.includes('bas')) priority = 'low';
      
      const assignee = (match[5] || '').trim();
      
      tickets.push({
        id,
        label,
        priority,
        status,
        assignee: assignee || undefined
      });
    }
  }
  return tickets;
}

function writeTicketsToMarkdown(filePath: string, tickets: TicketInfo[]) {
  let header = `# Système de Suivi des Bugs (Tickets Actifs)

Voici la liste des tickets ouverts concernant les bugs fonctionnels, les failles de sécurité, l'accessibilité ou les améliorations requises, basés sur l'audit complet du projet.

Vous pouvez consulter l'historique de tous les tickets déjà résolus et clôturés ici : [TICKETS_ARCHIVE.md](./TICKETS_ARCHIVE.md).

---
`;
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    const separatorIdx = existing.indexOf('---');
    if (separatorIdx !== -1) {
      header = existing.substring(0, separatorIdx + 3) + '\n';
    }
  }
  
  const lines = tickets.map(t => {
    let statusChar = ' ';
    if (t.status === 'in_progress') statusChar = '/';
    else if (t.status === 'done') statusChar = 'x';
    
    let priorityStr = 'moyenne';
    if (t.priority === 'high') priorityStr = 'haute';
    else if (t.priority === 'low') priorityStr = 'basse';
    
    let line = `- [${statusChar}] **[${t.id}]** ${t.label} | priorité: ${priorityStr}`;
    if (t.assignee) {
      line += ` | assigné: ${t.assignee}`;
    }
    return line;
  });
  
  fs.writeFileSync(filePath, header + '\n' + lines.join('\n') + '\n', 'utf8');
}

interface SavedNode {
  id: string;
  position?: { x: number; y: number };
  data?: {
    label?: string;
    priority?: 'high' | 'medium' | 'low';
    status?: 'todo' | 'in_progress' | 'done';
    assignee?: string;
  };
}

interface SavedEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export function devDashboardPlugin(): Plugin {
  const srcDir = path.resolve(process.cwd(), 'src');
  const tasksFilePath = path.resolve(process.cwd(), 'tasks.json');
  const ticketsFilePath = path.resolve(process.cwd(), 'docs', 'TICKETS.md');

  return {
    name: 'dev-dashboard-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        // GET /api/tasks
        if (req.url === '/api/tasks' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          
          const tickets = parseTicketsFromMarkdown(ticketsFilePath);
          
          let savedTasks: { nodes: SavedNode[]; edges: SavedEdge[] } = { nodes: [], edges: [] };
          if (fs.existsSync(tasksFilePath)) {
            try {
              savedTasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
            } catch (e) {
              console.error('Error parsing tasks.json:', e);
            }
          }
          
          const savedNodesMap = new Map(savedTasks.nodes.map(n => [n.id, n]));
          
          const mergedNodes = tickets.map((t, idx) => {
            const savedNode = savedNodesMap.get(t.id);
            return {
              id: t.id,
              type: 'taskNode',
              position: savedNode?.position || { x: 100 + (idx % 3) * 250, y: 80 + Math.floor(idx / 3) * 150 },
              data: {
                label: t.label,
                priority: t.priority,
                status: t.status,
                assignee: t.assignee
              }
            };
          });
          
          const validNodeIds = new Set(mergedNodes.map(n => n.id));
          const filteredEdges = (savedTasks.edges || []).filter(
            (e: SavedEdge) => validNodeIds.has(e.source) && validNodeIds.has(e.target)
          );
          
          res.end(JSON.stringify({ nodes: mergedNodes, edges: filteredEdges }));
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
              const data = JSON.parse(body) as { nodes?: SavedNode[]; edges?: SavedEdge[] };
              fs.writeFileSync(tasksFilePath, JSON.stringify(data, null, 2), 'utf8');
              
              const tickets = (data.nodes || []).map((n: SavedNode) => ({
                id: n.id,
                label: n.data?.label || '',
                priority: n.data?.priority || 'medium',
                status: n.data?.status || 'todo',
                assignee: n.data?.assignee
              }));
              
              writeTicketsToMarkdown(ticketsFilePath, tickets);
              
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

        // GET /api/profiles
        if (req.url === '/api/profiles' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          const mockProfilesPath = path.resolve(process.cwd(), 'profiles-mock.json');
          let profiles = [];
          if (fs.existsSync(mockProfilesPath)) {
            try {
              profiles = JSON.parse(fs.readFileSync(mockProfilesPath, 'utf8'));
            } catch (e) {
              console.error('Error parsing profiles-mock.json:', e);
            }
          }
          res.end(JSON.stringify(profiles));
          return;
        }

        // POST /api/profiles
        if (req.url === '/api/profiles' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const profiles = JSON.parse(body);
              const mockProfilesPath = path.resolve(process.cwd(), 'profiles-mock.json');
              fs.writeFileSync(mockProfilesPath, JSON.stringify(profiles, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, profiles }));
            } catch (err) {
              res.statusCode = 500;
              const msg = err instanceof Error ? err.message : String(err);
              res.end(JSON.stringify({ error: msg }));
            }
          });
          return;
        }

        // GET /api/progression
        if (req.url === '/api/progression' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          const mockProgressionPath = path.resolve(process.cwd(), 'progression-mock.json');
          let progression = {};
          if (fs.existsSync(mockProgressionPath)) {
            try {
              progression = JSON.parse(fs.readFileSync(mockProgressionPath, 'utf8'));
            } catch (e) {
              console.error('Error parsing progression-mock.json:', e);
            }
          }
          res.end(JSON.stringify(progression));
          return;
        }

        // POST /api/progression
        if (req.url === '/api/progression' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const progression = JSON.parse(body);
              const mockProgressionPath = path.resolve(process.cwd(), 'progression-mock.json');
              fs.writeFileSync(mockProgressionPath, JSON.stringify(progression, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, progression }));
            } catch (err) {
              res.statusCode = 500;
              const msg = err instanceof Error ? err.message : String(err);
              res.end(JSON.stringify({ error: msg }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}
