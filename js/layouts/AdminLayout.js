// Archivo: js/layouts/AdminLayout.js

export function AdminLayout(content, options = {}) {
    const { title = 'Panel de Administración', footerText = '© 2023 Administración' } = options;

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title}</title>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <header>
                <nav class="navbar navbar-dark bg-dark">
                    <a class="navbar-brand" href="/">Admin Panel</a>
                </nav>
            </header>

            <div class="d-flex">
                <aside class="bg-secondary text-white p-4" style="width: 250px;">
                    <h4>Menú de administración</h4>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#/users">Usuarios</a>
                        </li>
                    </ul>
                </aside>

                <main class="container-fluid p-4" style="flex: 1;">
                    ${content}  <!-- Aquí se inserta el contenido específico de la página -->
                </main>
            </div>

            <footer class="bg-dark text-white text-center py-4 mt-5">
                <p>${footerText}</p>
            </footer>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;
}
