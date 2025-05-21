module.exports = {
  apps: [
    {
      name: 'web-nextjs-app',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'development',  // Variáveis para desenvolvimento
      },
      env_production: {            // Variáveis específicas para produção
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8000/api/v1/',
        PORT: 80,
      },
    },
  ],
};