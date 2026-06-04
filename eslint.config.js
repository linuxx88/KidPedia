import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import path from 'path'

const customModularityPlugin = {
  rules: {
    'strict-feature-boundaries': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce strict modular boundaries between features.',
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            if (importPath.startsWith('.')) {
              const filename = context.filename || (typeof context.getFilename === 'function' ? context.getFilename() : '');
              const resolvedPath = path.resolve(path.dirname(filename), importPath);
              const normalizedResolved = resolvedPath.replace(/\\/g, '/');
              const srcIndex = normalizedResolved.indexOf('/src/');
              if (srcIndex === -1) return;

              const relativeToSrc = normalizedResolved.substring(srcIndex + 5);
              if (relativeToSrc.startsWith('features/')) {
                const parts = relativeToSrc.split('/');
                const targetFeature = parts[1];

                const normalizedFilename = filename.replace(/\\/g, '/');
                const filenameIndex = normalizedFilename.indexOf('/src/');
                if (filenameIndex === -1) return;
                const relativeSource = normalizedFilename.substring(filenameIndex + 5);
                const sourceParts = relativeSource.split('/');
                const sourceFeature = (sourceParts[0] === 'features') ? sourceParts[1] : null;

                if (sourceFeature !== targetFeature) {
                  const isPublicAPI = (parts.length === 2) || 
                                      (parts.length === 3 && parts[2].startsWith('index'));
                  if (!isPublicAPI) {
                    context.report({
                      node,
                      message: `Crossing feature boundaries is forbidden. Import from the feature's public API (index.ts) of "${targetFeature}" instead of deep importing "${relativeToSrc}".`,
                    });
                  }
                }
              }
            }
          }
        };
      }
    }
  }
};

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'custom-modularity': customModularityPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_' 
        }
      ],
      'custom-modularity/strict-feature-boundaries': 'error',
    },
  },
])