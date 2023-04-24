// app class
class App {
  constructor() {
    // data
    this.notes = [];

    // prepend vars with $ to quickly identify html elements over data
    this.$placeholder = document.querySelector('#placeholder');
    this.$form = document.querySelector('#form');
    this.$notes = document.querySelector('#notes');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$formButtons = document.querySelector('#form-buttons');
    this.$formCloseButton = document.querySelector('#form-close-button');

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', event => {
      this.handleFormClick(event);
    });

    this.$form.addEventListener('submit', event => {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      const hasNote = title || text; // title/text truthy?
      if (hasNote) {
        this.addNote({ title, text })
      }
    });

    this.$formCloseButton.addEventListener('click', event => {
      event.stopPropagation(); // prevent click on button from bubbling up
      this.closeForm();
    });
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target);

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;
    const hasNote = title || text; // title/text truthy?

    if (isFormClicked) {
      this.openForm();
    } else if (hasNote) {
      this.addNote({title, text});
    } else {
      this.closeForm();
    }
  }

  // open note form
  openForm() {
    this.$form.classList.add('form-open');
    this.$noteTitle.style.display = 'block';
    this.$formButtons.style.display = 'block';
  }
  // close note form
  closeForm() {
    this.$form.classList.remove('form-open');
    this.$noteTitle.style.display = 'none';
    this.$formButtons.style.display = 'none';
    this.$noteTitle.value = '';
    this.$noteText.value = '';
  }
  // add a note
  addNote({title, text}) { // destructure object in arguments
    const newNote = {
      title,
      text,
      color: 'white',
      // set initial note id to 1, otherwise increment last not id by 1
      id: this.notes.length > 0 ? this.notes[this.notes.length -1].id + 1 : 1
    };
    this.notes = [...this.notes, newNote];
    console.log(this.notes); // debug
    this.displayNotes();
    this.closeForm();
  }

  // display notes
  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex';

    this.$notes.innerHTML = this.notes.map(note => `
      <div style="background: ${note.color};" class="note">
        <div class="${note.title && 'note-title'}">${note.title}</div> 
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <img class="toolbar-color" src="https://icon.now.sh/palette">
            <img class="toolbar-delete" src="https://icon.now.sh/delete">
          </div>
        </div>
      </div>
    `).join('');
  }


}

new App()