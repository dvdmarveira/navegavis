/* 
Este script serve como guia para geração dos ícones PWA da NavegaVis.
Para executar este script, você precisará instalar:

npm install sharp

Depois, execute com:
node scripts/generate-pwa-icons.js
*/

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Verifica se a pasta icons existe, se não, cria
const iconsDir = path.join(__dirname, "../public/icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Caminho para o logo original (substitua pelo caminho correto da sua imagem logo)
const originalLogo = path.join(__dirname, "../public/placeholder-logo.png");

// Tamanhos de ícones necessários para PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Função para gerar ícones em todos os tamanhos
async function generateIcons() {
  console.log("Gerando ícones para PWA NavegaVis...");

  try {
    // Carrega a imagem original
    const inputBuffer = fs.readFileSync(originalLogo);

    // Gera ícones em todos os tamanhos
    for (const size of iconSizes) {
      const outputFile = path.join(iconsDir, `icon-${size}x${size}.png`);

      // Redimensiona a imagem e mantém transparência
      await sharp(inputBuffer).resize(size, size).png().toFile(outputFile);

      console.log(`✅ Gerado ícone ${size}x${size}`);
    }

    console.log("\n🎉 Todos os ícones foram gerados com sucesso!");
    console.log("📍 Local: /public/icons/");
  } catch (error) {
    console.error("❌ Erro ao gerar ícones:", error);
  }
}

// Executa a função principal
generateIcons();
