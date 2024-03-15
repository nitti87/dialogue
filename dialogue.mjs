export default class dialogue {
  #body
  #container
  #title
  #main
  #footer

  constructor({ addClose_btn = true, titleContent } = {
    addClose_btn: Boolean,
    titleContent: () => {}
  }) {
    const [ body, container, title_container, title, close_btn, main, footer ] = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ];

    body.dataset.id = 'dialogue';

    body.classList.add("dialogue-body");
    container.classList.add("dialogue-container");
    title_container.classList.add("dialogue-title-container");
    title.classList.add("dialogue-title");
    close_btn.classList.add("dialogue-close-button");
    main.classList.add("dialogue-main");
    footer.classList.add("dialogue-footer");

    const x = document.createTextNode('×');
    close_btn.appendChild(x);

    this.#body = body;
    this.#container = container;
    this.#title = title;
    this.#main = main;
    this.#footer = footer;

    typeof titleContent === "function" && titleContent instanceof HTMLElement ? 
      this.#title.appendChild(titleContent) : 
      this.#title.setAttribute("vlang-text", titleContent);

    title_container.appendChild(this.#title);
    addClose_btn ? title_container.appendChild(close_btn) : null;

    this.#body.appendChild(this.#container);
    this.#container.appendChild(title_container);
    this.#container.appendChild(this.#main);
    this.#container.appendChild(this.#footer);

    document.querySelector('body').appendChild(this.#body);

    close_btn.addEventListener('click', () => this.hide());

    return this
  }

  footer({ 
    addCancel_btn = false, 
    vlangFor_btns: { cancelbtn, submitbtn }, 
    btn_functions: { cancelbtn_fn, submitbtn_fn } 
  } = {
    addCancel_btn: false, 
    vlangFor_btns: {  
      cancelbtn: "Cancel",  
      submitbtn: "Submit"  
    },  
    btn_functions: {
      cancelbtn_fn: () => {}, 
      submitbtn_fn: () => {}
    }  
  }) {
    const [buttonsContainer, cancelbtn_element, submitbtn_element] = [
      document.createElement("div"), 
      document.createElement("button"),  
      document.createElement("button")
    ];

    buttonsContainer.classList.add("dialogue-footer-container");
    cancelbtn_element.classList.add("dialogue-cancel-btn");
    cancelbtn_element.classList.add("secondary-button");
    submitbtn_element.classList.add("dialogue-submit-btn");
    submitbtn_element.classList.add("primary-button");

    cancelbtn_element.setAttribute('vlang-text', cancelbtn);
    submitbtn_element.setAttribute('vlang-text', submitbtn);

    buttonsContainer.appendChild(submitbtn_element);
    addCancel_btn ? buttonsContainer.prepend(cancelbtn_element) : null;

    this.#footer.appendChild(buttonsContainer);

    if (typeof submitbtn_fn === 'function') {
      submitbtn_element.addEventListener("click", (e) => {
        submitbtn_fn(e);
      });
      addCancel_btn && typeof cancelbtn_fn === 'function' ? cancelbtn_element.addEventListener("click", (e) => {
        cancelbtn_fn(e);
      }) : null;
    }

    return this;
  }

  hide() {
    this.#body.remove();
    return this;
  }

  main({ content } = { content: () => {} }) {
    typeof content === 'function' && content instanceof HTMLElement ?
      this.#main.appendChild(content) :
      console.error(`Dialogue Error: "main" expected function that returns an instance of HTML element.`);
      
    return this;
  }
}
