#!/bin/bash

# Script de inicio rápido para el backend de Flow Finder

echo "🚀 Iniciando Zynera API - Flow Finder Backend"
echo ""

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado"
    echo "📝 Creando .env desde .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Archivo .env creado"
        echo "⚠️  IMPORTANTE: Edita .env y añade tu OPENAI_API_KEY"
    else
        echo "❌ Error: .env.example no encontrado"
        exit 1
    fi
fi

# Verificar si hay node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar OPENAI_API_KEY
if ! grep -q "OPENAI_API_KEY=.*[^=]$" .env 2>/dev/null; then
    echo "⚠️  OPENAI_API_KEY no configurada en .env"
    echo "   Obtén una API key en: https://platform.openai.com/api-keys"
fi

echo ""
echo "✅ Todo listo!"
echo "🌐 El servidor se iniciará en http://localhost:3001"
echo ""
npm run dev

