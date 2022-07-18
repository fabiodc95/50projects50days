/*
 * This class defines a custom HTML <search-box> element that display an
 * <input> text field plus an icon. By default, it displays a
 * search icon to the right of the text field.
 */
class SearchBox extends HTMLElement {
  constructor() {
    super() // Invoke the superclass constructor

    // Create a shadow DOM tree and attach it to this element, setting the value of this.shadowRoot.
    this.attachShadow({ mode: "open" })

    // Clone the template that defines the descendants and
    // stylesheet for this custom component, and append that
    // content to the shadow root.
    this.shadowRoot.append(SearchBox.template.content.cloneNode(true))

    // Get references to the important elements in the shadow DOM
    this.input = this.shadowRoot.getElementById("input")
    let searchSlot = this.shadowRoot.querySelector(
      "slot[name='magnifying-glass']"
    )

    // If the user clicks on the magnifying glass, trigger a "search" event.
    // Also trigger it if the Enter key is pressed (because that PointerEvent.type property = click)
    // event. (The "change" event does not bubble out of the shadow DOM.)
    searchSlot.onclick = (event) => {
      event.preventDefault() // Prevent form submit
      event.stopPropagation() // Prevent click events from bubbling
      if (this.disabled) return // Do nothing when disabled
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: this.input.value,
        })
      )
    }
  }

  // When some of our attributes are set or changed, we need to set the
  // corresponding value on the internal <input> element. This life cycle
  // method, together with the static observedAttributes property below,
  // takes care of that.
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "disabled":
        let btn = this.shadowRoot.querySelector("button[type='submit']")
        this.input.disabled = btn.disabled = newValue !== null
        break
      case "placeholder":
        this.input.placeholder = newValue
        break
      case "size":
        this.input.size = newValue
        break
      case "value":
        this.input.value = newValue
    }
  }

  // Finally, we define property getters and setters for properties that
  // correspond to the HTML attributes we support. The getters simply return
  // the value (or the presence) of the attribute. And the setters just set
  // the value (or the presence) of the attribute. When a setter method
  // changes an attribute, the browser will automatically invoke the
  // attributeChangedCallback above.
  get placeholder() {
    return this.getAttribute("placeholder")
  }

  get size() {
    return this.getAttribute("size")
  }

  get value() {
    return this.getAttribute("value")
  }

  get disabled() {
    return this.getAttribute("disabled")
  }

  get hidden() {
    return this.getAttribute("hidden")
  }

  set placeholder(value) {
    this.setAttribute("placeholder", value)
  }

  set value(text) {
    this.setAttribute("value", text)
  }

  set disabled(value) {
    if (value) this.setAttribute("disabled", "")
    else this.removeAttribute("disabled")
  }

  set hidden(value) {
    if (value) this.setAttribute("hidden", "")
    else this.removeAttribute("hidden")
  }
}

// This static field is required for the attributeChangedCallback method.
// Only attributes named in this array will trigger calls to that method.
SearchBox.observedAttributes = ["disabled", "placeholder", "size", "value"]

// Create a <template> element to hold the stylesheet and the tree of
// elements that we'll use fot each instance of the SearchBox element.
SearchBox.template = document.createElement("template")

// We initialize the template by parsing this string of HTML. Note, however,
// that when we instantiate a SearchBox, we are able to just clone the nodes
// in the template and do have to parse the HTML again.
SearchBox.template.innerHTML = `
<style>
  @import "components/search-box.css";  
</style>
<form id="form">
  <input type="text" id="input" class="input" />
  <slot name="magnifying-glass">
    <button type="submit"><i class="fas fa-search"></i></button>
  </slot>
</form>`

// Finally, we call customElement.define() to register the SearchBox element
// as the implementation of the <search-box> tag. Custom elements are required
// to have a tag name that contains a hyphen.
customElements.define("search-box", SearchBox)
