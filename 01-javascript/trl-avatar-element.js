class TrlAvatar extends HTMLElement {
  constructor() {
    super(); //llamar al constructor de HTMLElement

    this.attachShadow({ mode: 'open' });
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`;
  }


  render() {
    const service = this.getAttribute('service') ?? 'githuib'
    const username = this.getAttribute('username') ?? 'midudev'
    const size = this.getAttribute('size') ?? '40'
    const url = this.createUrl(service, username);
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: inline-block; /* Importante para que respete márgenes y padding externos */
        vertical-align: middle;
      }
      img {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%; /* Es mejor usar 50% para círculos perfectos */
        object-fit: cover; /* Para que la imagen no se deforme */
      } 
    </style>    

    <img
      src="${url}" 
      alt="Avatar de ${username}"
      class="avatar"
    />
    `
  }
  connectedCallback() {
    this.render();
  }
}


customElements.define('trl-avatar', TrlAvatar);