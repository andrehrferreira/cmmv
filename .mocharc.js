module.exports = {
    require: [
      "ts-node/register",
      "tsconfig-paths/register",
      "node_modules/reflect-metadata/Reflect.js",
      "hooks/mocha-init-hook.ts"
    ],
    spec: [
      "packages/**/*.spec.ts"
    ],
    ignore: [
      "node_modules/**/*",
      "packages/**/node_modules/**/*"
    ],
    extension: ['ts'],
    recursive: true,
    exit: true
};
  