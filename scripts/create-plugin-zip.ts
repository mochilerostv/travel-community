// Script para crear el ZIP del plugin desde este proyecto
async function createPluginZip() {
  console.log("🔧 Creando ZIP del plugin Mochileros Travel Deals Pro v1.4.0...")

  const pluginFiles = [
    "mochileros-travel-deals/mochileros-travel-deals.php",
    "mochileros-travel-deals/assets/mochileros-deals.css",
    "mochileros-travel-deals/assets/mochileros-deals.js",
    "mochileros-travel-deals/readme.txt",
  ]

  // En un entorno real, aquí usarías una librería como JSZip
  // Por ahora, solo mostramos los archivos que se incluirían

  console.log("📁 Archivos a incluir en el ZIP:")
  pluginFiles.forEach((file) => {
    console.log(`  ✅ ${file}`)
  })

  console.log("\n📦 Para crear el ZIP manualmente:")
  console.log("1. Descarga este proyecto completo")
  console.log("2. Ve a la carpeta mochileros-travel-deals/")
  console.log("3. Selecciona todos los archivos dentro de esa carpeta")
  console.log("4. Crea un ZIP llamado mochileros-travel-deals-1.4.0.zip")
  console.log("5. Sube el ZIP a WordPress: Plugins → Añadir nuevo → Subir plugin")

  return "Plugin ZIP ready for manual creation"
}

createPluginZip().then(console.log).catch(console.error)
