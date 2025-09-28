<?php
// Asegúrate de que la solicitud sea un POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Recopila y sanitiza los datos del formulario
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Verifica que los datos no estén vacíos
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Establece un código de respuesta HTTP 400 (Bad Request)
        http_response_code(400);
        echo "Por favor, completa el formulario y vuelve a intentarlo.";
        exit;
    }

    // Configura la dirección de correo a la que se enviará el mensaje
    $recipient = "tucorreo@ejemplo.com"; // 👈 Sustituye esto con tu dirección de correo

    // Asunto del correo
    $subject = "Nuevo mensaje desde el sitio web de inmuebles - {$name}";

    // Construye el contenido del correo
    $email_content = "Nombre: {$name}\n";
    $email_content .= "Correo: {$email}\n\n";
    $email_content .= "Mensaje:\n{$message}\n";

    // Configura las cabeceras del correo
    $email_headers = "From: {$name} <{$email}>";

    // Envía el correo
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Establece un código de respuesta HTTP 200 (OK)
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        // Establece un código de respuesta HTTP 500 (Internal Server Error)
        http_response_code(500);
        echo "Algo salió mal. No pudimos enviar tu mensaje.";
    }

} else {
    // Si la solicitud no es POST, no permitas el acceso directo
    http_response_code(403);
    echo "Hubo un problema con tu envío, por favor inténtalo de nuevo.";
}
?>