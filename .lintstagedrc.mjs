export default {
  "*.{ts,js,vue}": filenames => {
    if (filenames.length === 0) return [];

    return [
      `prettier --write ${filenames.join(" ")}`,
      `eslint --fix --max-warnings 0 ${filenames.join(" ")}`,
    ];
  },

  "*.{scss,css}": filenames => {
    if (filenames.length === 0) return [];

    return [
      `prettier --write ${filenames.join(" ")}`,
      `stylelint --fix ${filenames.join(" ")}`,
    ];
  },

  "*.vue": filenames => {
    if (filenames.length === 0) return [];

    return [`stylelint --fix ${filenames.join(" ")}`];
  },

  "**/package.json": filenames => `prettier --write ${filenames.join(" ")}`,

  "*.{json,md,yml,yaml,html}": filenames => {
    const otherFiles = filenames.filter(f => !f.endsWith("package.json"));

    if (otherFiles.length === 0) return [];

    return [`prettier --write ${otherFiles.join(" ")}`];
  },
};
