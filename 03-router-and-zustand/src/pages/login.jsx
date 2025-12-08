return (
  <section class="pagina-registro">
    <h2>Crea tu cuenta</h2>
    <p>Únete a nuestra comunidad de negocios locales</p>

    <div class="tabs-container">
      <button type="button" class="tab-btn active" onclick="cambiarModo('usuario')">Comprador</button>
      <button type="button" class="tab-btn" onclick="cambiarModo('negocio')">Negocio</button>
    </div>
    <form>
      <input type="hidden" id="tipoUsuario" name="role" value="usuario" />

      <div id="campos-negocio" style="display: none;">
        <div class="form-group">
          <label for="nombre-negocio">Nombre del negocio</label>
          <input type="text" id="nombre-negocio" name="nombre-negocio"
            placeholder="Introduce el nombre de tu negocio" />
        </div>

        <div class="form-group">
          <label for="tipo-negocio">Tipo de negocio</label>
          <select id="tipo-negocio" name="tipo-negocio">
            <option value="">Selecciona una categoría</option>
            <option value="Restaurante">Restaurante</option>
            <option value="Puesto de comida">Puesto de comida</option>
            <option value="Papelería">Papelería</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" name="email" placeholder="tu@email.com" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Crea una contraseña segura" required minlength="8" />
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirmar contraseña</label>
        <input type="password" id="confirm-password" name="confirm-password"
          placeholder="Vuelve a escribir la contraseña" required minlength="8" />
      </div>

      <div class="form-group checkbox">
        <label for="terminos" class="checkbox-label">
          <input type="checkbox" name="terminos" required />
          <span>
            Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>
          </span>
        </label>
      </div>

      <div class="form-group">
        <button type="submit">Crear Cuenta</button>
      </div>
    </form>

    <p class="enlace-inferior">¿Ya tienes una cuenta? <a href="./iniciar-sesión.html">Inicia sesión</a></p>
  </section>


)