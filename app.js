// app class
class App {
  constructor() {
    // data
    this.notes = [];
    this.title = '';
    this.text = '';
    this.id = '';

    // prepend vars with $ to quickly identify html elements over data
    this.$placeholder = document.querySelector('#placeholder');
    this.$form = document.querySelector('#form');
    this.$notes = document.querySelector('#notes');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$formButtons = document.querySelector('#form-buttons');
    this.$formCloseButton = document.querySelector('#form-close-button');
    this.$modal = document.querySelector('.modal');
    this.$modalTitle = document.querySelector('.modal-title');
    this.$modalText = document.querySelector('.modal-text');
    this.$modalCloseButton = document.querySelector('.modal-close-button');
    this.$colorTooltip = document.querySelector('#color-tooltip');

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', event => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
    });

    document.body.addEventListener('mouseover', event => {
      this.openTooltip(event);
    });

    document.body.addEventListener('mouseout', event => {
      this.closeTooltip(event);
    });

    this.$colorTooltip.addEventListener('mouseover', function() {
      this.style.display = 'flex'; // with function declaration, 'this' refers to the actual element
    });

    this.$colorTooltip.addEventListener('mouseout', function() {
      this.style.display = 'none';
    });

    this.$colorTooltip.addEventListener('click', event => {
      const color = event.target.dataset.color;
      if (color) {
        this.editNoteColor(color);
      }
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

    this.$modalCloseButton.addEventListener('click', event => {
      this.closeModal(event);
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

  // open the modal
  openModal(event) {
    if (event.target.closest('.note')) {// click closest to element with class "note" ?) 
      this.$modal.classList.toggle('open-modal');
      this.$modalTitle.value = this.title;
      this.$modalText.value = this.text;
    }

  }

  // close the modal
  closeModal(event) {
    this.editNote();
    this.$modal.classList.toggle('open-modal');
  }

  // open tooltip
  openTooltip(event) {
    if (!event.target.matches('.toolbar-color')) return;
    this.id = event.target.dataset.id; 
    const noteCoords = event.target.getBoundingClientRect(); // get page coordinates of event
    const horizontal = noteCoords.left;
    const vertical = window.scrollY - 30;
    this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    this.$colorTooltip.style.display = 'flex';

  }

  // close tooltip
  closeTooltip(event) {
    if (!event.target.matches('.toolbar-color')) return;
    this.$colorTooltip.style.display = 'none';
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

  // edit note
  editNote() {
    const title = this.$modalTitle.value;
    const text = this.$modalText.value;
    // use map to get the proper note, leave other notes in place
    this.notes = this.notes.map(note => 
      // convert the id in string format (within html) to a number for comparisons
      note.id === Number(this.id) ? { ...note, title, text } : note
    );
    this.displayNotes();
  }

  editNoteColor(color) {
    this.notes = this.notes.map(note => 
      note.id === Number(this.id) ? { ...note, color } : note
    );
    this.displayNotes();
  }

  // select clicked note
  selectNote(event) {
    const $selectedNote = event.target.closest('.note'); // use closest method to get the selected note
    if (!$selectedNote) return; // if no selected note, don't run the rest of this code...
    // use array destructoring to get the elements
    const [$noteTitle, $noteText] = $selectedNote.children
    this.title = $noteTitle.innerText;
    this.text = $noteText.innerText;
    this.id = $selectedNote.dataset.id;
  }

  // display notes
  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex';

    // use data attribute on note, binding to note.id
    this.$notes.innerHTML = this.notes.map(note => `
      <div style="background: ${note.color};" class="note" data-id="${note.id}">
        <div class="${note.title && 'note-title'}">${note.title}</div> 
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <i class="fa-solid fa-palette toolbar-color" data-id=${note.id}></i>
            <img class="toolbar-delete" src="https://icon.now.sh/delete">
          </div>
        </div>
      </div>
    `).join('');
  }
            // <img class="toolbar-color" src="https://icon.now.sh/palette">

}

new App()