// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

const pluginDeclarationQuotes = require("eslint-plugin-declaration-quotes");
const pluginStylisticJs = require("@stylistic/eslint-plugin-js");
const pluginStylisticTs = require("@stylistic/eslint-plugin-ts");

const ignoreDirectories = [
  "dist/*",
  "public/*",
];

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: [
      ...ignoreDirectories,
    ],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      'declaration-quotes': pluginDeclarationQuotes,
      '@stylistic/js': pluginStylisticJs,
      '@stylistic/ts': pluginStylisticTs,
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          "prefix": "app",
          "style": "kebab-case",
          "type": "element"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          "prefix": "app",
          "style": "camelCase",
          "type": "attribute"
        }
      ],
      "@stylistic/js/array-bracket-spacing": [
        "error",
        "always",
        {
          "singleValue": true
        }
      ],
      "@stylistic/js/computed-property-spacing": [
        "error",
        "always"
      ],
      "@stylistic/ts/comma-dangle": [
        "error",
        "always-multiline"
      ],
      "@stylistic/ts/indent": [
        "error",
        2,
        {
          "SwitchCase": 1
        }
      ],
      "@stylistic/ts/key-spacing": "error",
      "@stylistic/ts/member-delimiter-style": [
        "error",
        {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true
          },
          "singleline": {
            "delimiter": "semi",
            "requireLast": true
          }
        }
      ],
      "@stylistic/ts/no-extra-semi": "error",
      "@stylistic/ts/object-curly-spacing": [
        "error",
        "always"
      ],
      "@stylistic/ts/quotes": [
        "error",
        "backtick",
        {
          "avoidEscape": true
        }
      ],
      "@stylistic/ts/semi": [
        "error"
      ],
      "@stylistic/ts/space-infix-ops": "error",
      "@typescript-eslint/array-type": [
        "error",
        {
          "default": "array-simple"
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "explicit"
        }
      ],
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          "allowTernary": true
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "args": "none",
          "argsIgnorePattern": "^_",
          "ignoreRestSiblings": true,
          "vars": "local"
        }
      ],
      "declaration-quotes/quotes": [
        "error",
        "single"
      ],
      "indent": "off",
      "key-spacing": "off",
      "no-case-declarations": "off",
      "no-console": "error",
      "no-empty": [
        "error",
        {
          "allowEmptyCatch": true
        }
      ],
      "no-empty-function": "off",
      "no-fallthrough": [
        "error",
        {
          "allowEmptyCase": true
        }
      ],
      "no-unused-vars": "off",
      "object-shorthand": "warn",
      "quote-props": [
        "error",
        "as-needed",
        {
          "keywords": true
        }
      ],
      "quotes": "off",
      "semi": "off",
      "sort-imports": [
        "warn",
        {
          "ignoreDeclarationSort": true
        }
      ],
      "space-before-function-paren": "error",
      "space-infix-ops": "off"
    },
  },
  {
    files: ["**/*.html"],
    ignores: [
      ...ignoreDirectories,
    ],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
