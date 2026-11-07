// Configuración de la hoja de cálculo
const SHEET_NAME = "Asistentes";

function doGet(e) {
  // Usamos createTemplateFromFile para cargar el HTML de forma limpia
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    // ESTA LÍNEA ES VITAL PARA MÓVILES
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setTitle('Evolución Financiera - Registro')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Función para guardar en Google Sheets
function registrarDatosPC(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Si la hoja no existe, la crea con los encabezados
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Fecha y Hora", "Nombre y Apellido", "Número de DNI", "Celular"]);
      // Darle formato al encabezado (opcional)
      sheet.getRange("A1:D1").setFontWeight("bold").setBackground("#0a1931").setFontColor("#ffffff");
    }
    
    // Guardar los datos
    sheet.appendRow([new Date(), data.fullname, data.dni, data.phone]);
    
    return { status: "success" };
  } catch (error) {
    return { status: "error", message: error.toString() };
  }
}