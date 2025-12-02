
# 📱 Patrulha Animal - App (PWA)

Bem-vindo ao Front-end do **Patrulha Animal**. Esta aplicação foi desenvolvida como um **Progressive Web App (PWA)**, oferecendo uma experiência nativa de aplicativo móvel diretamente no navegador. O projeto foca em UX/UI moderna, responsividade e integração em tempo real com mapas.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 🎯 Visão Geral do Produto

O aplicativo resolve a dor de tutores de animais, unificando em uma única interface:
1.  **Rastreamento GPS:** Visualização em tempo real da localização do pet (Google Maps).
2.  **Marketplace:** Loja integrada para compra de acessórios e ração.
3.  **Saúde:** Carteira de vacinação digital e agendamento de serviços.
4.  **Gestão:** Perfil completo do animal com dados médicos.

---

## 🔐 Configuração de API Keys

Este projeto utiliza serviços externos (Google Maps Platform) que requerem chaves de API pagas/privadas. Por motivos de segurança e conformidade, **o arquivo de variáveis de ambiente não está incluído no repositório**.

Para executar o mapa localmente, é necessário configurar o arquivo `.env.local` com uma chave válida.

### Configuração:
Crie um arquivo `.env.local` na raiz do projeto:


# Chave da API do Google Maps (Necessária para renderizar o mapa)
OBS: ENVIADA NO COMENTÁRIO DA ENTREGA

🚀 Como Rodar o Projeto

 Instalação
 
Clone o repositório e instale as dependências:


cd patrulha-animal-frontend
npm install

# Conexão com Backend
O Frontend está configurado para se comunicar com a API. Verifique o arquivo src/App.jsx ou src/config.js:

Modo Produção (Padrão): Conecta automaticamente ao servidor na nuvem (Render).

Modo Local: Se desejar rodar com o backend local, altere a constante API_URL para http://localhost:3000.

# Execução
Inicie o servidor de desenvolvimento:

npm run dev

Acesse no navegador: http://localhost:5173/

💡 Dica de Visualização: Para a melhor experiência, abra o DevTools do Chrome (F12), clique no ícone de dispositivo móvel (Ctrl+Shift+M) e selecione iPhone 12 Pro ou similar. O layout foi otimizado para Mobile First.
