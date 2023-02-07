const esbuild = require('esbuild');

const build = async () => {
  await esbuild.build({
    entryPoints: ['./src/index.js'],
    bundle: true,
    platform: 'node',
    target: ['node12.22'],
    outbase: './src',
    outdir: './out',
    packages: 'external',
  });

  console.log('Build de aplicación exitosa');
};

build();
