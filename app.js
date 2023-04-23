// app class
class App {
  constructor() {
    // data
    this.notes = [];

    // prepend vars with $ to quickly identify html elements over data
    this.$form = document.querySelector('#form');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$formButtons = document.querySelector('#form-buttons');
    
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
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target);

    if (isFormClicked) {
      this.openForm();
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
  }
  // add a note
  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: 'white',
      // set initial note id to 1, otherwise increment last not id by 1
      id: this.notes.length > 0 ? this.notes[this.notes.length -1].id + 1 : 1
    };
    this.notes = [...this.notes, newNote];
    console.log(this.notes);
  }
}

new App()