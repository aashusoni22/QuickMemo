const notes = document.querySelector(".notes");
const addNoteBtn = document.querySelector("#addNoteBtn");
const darkMode = document.querySelector("#checkbox");
const search = document.querySelector("#search");
const moon = document.querySelector("#modeIcon");
const heart = document.querySelector(".fa-heart");
const favMenu = document.querySelector("#favs");
const archiveMenu = document.querySelector("#archive");
const allNotesMenu = document.querySelector("#allNotes");
const trashMenu = document.querySelector("#trash");
const menuHeading = document.querySelector(".menuHeading");
const messageContainer = document.querySelector(".message-container"); // New container for the message

function saveNotesToLocalStorage() {
  const serializedNotes = JSON.stringify(note.innerHTML);
  localStorage.setItem("notes", serializedNotes);
}

function loadNotesFromLocalStorage() {
  const serializedNotes = localStorage.getItem("notes");
  if (serializedNotes) {
    notes.innerHTML = JSON.parse(serializedNotes);
  }
}

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDarkMode = document.body.classList.contains("dark");
  if (isDarkMode) {
    moon.src = "sun.png";
  } else {
    moon.src = "moon.png";
  }
  moon.classList.add("mode-icon-clicked");
  setTimeout(() => {
    moon.classList.remove("mode-icon-clicked");
  }, 1000);
});

function createNote() {
  const note = document.createElement("div");
  note.classList.add("note");
  const noteHeader = document.createElement("div");
  noteHeader.classList.add("note-header");
  const title = document.createElement("textarea");
  title.classList.add("title");
  title.placeholder = "Add title here";
  noteHeader.appendChild(title);
  note.appendChild(noteHeader);
  const noteBody = document.createElement("div");
  noteBody.classList.add("note-body");
  const noteItem = document.createElement("textarea");
  noteItem.classList.add("noteItem");
  noteItem.placeholder = "Add note here";
  noteBody.appendChild(noteItem);
  const date = new Date();
  const noteDate = document.createElement("p");
  noteDate.classList.add("note-date");
  noteDate.textContent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  noteBody.appendChild(noteDate);
  note.appendChild(noteBody);

  const icons = document.createElement("div");
  icons.classList.add("icons");

  const fav = document.createElement("i");
  const archive = document.createElement("i");
  const trash = document.createElement("i");
  const recover = document.createElement("i");
  const blue = document.createElement("span");
  const orange = document.createElement("span");
  const yellow = document.createElement("span");
  const purple = document.createElement("span");

  purple.classList.add("purple");
  orange.classList.add("orange");
  yellow.classList.add("yellow");
  blue.classList.add("blue");
  fav.classList.add("fa-regular", "fa-heart");
  archive.classList.add("fa-regular", "fa-folder");
  trash.classList.add("fa-regular", "fa-trash-can");

  icons.appendChild(blue);
  icons.appendChild(orange);
  icons.appendChild(yellow);
  icons.appendChild(purple);
  icons.appendChild(fav);
  icons.appendChild(archive);
  icons.appendChild(trash);
  note.appendChild(icons);

  fav.addEventListener("click", () => {
    if (note.classList.contains("favorite")) {
      // If the note is in favorites, remove it from favorites
      note.classList.remove("favorite");
      if (favMenu.classList.contains("selected")) {
        // If the current menu is favorites, hide the note
        note.classList.add("note-hidden");
      }
      // Change the heart icon to regular
      fav.classList.remove("fa-solid");
      fav.classList.add("fa-regular");
    } else {
      // If the note is not in favorites, add it to favorites
      note.classList.add("favorite");
      if (note.classList.contains("trashed")) {
        // If the note is trashed, hide the note
        note.classList.add("note-hidden");
      }

      // Change the heart icon to solid
      fav.classList.remove("fa-regular");
      fav.classList.add("fa-solid");
    }
    saveNotesToLocalStorage();
  });

  archive.addEventListener("click", () => {
    if (note.classList.contains("archived")) {
      note.classList.remove("archived");
      note.classList.remove("favorite");
      icons.appendChild(purple);
      icons.appendChild(orange);
      icons.appendChild(yellow);
      icons.appendChild(blue);
      icons.appendChild(fav);
      icons.appendChild(archive);
      icons.appendChild(trash);
      if (archiveMenu.classList.contains("selected")) {
        note.classList.add("note-hidden");
      }
      archive.classList.remove("fa-solid");
      archive.classList.add("fa-regular");
    } else {
      note.classList.add("archived");
      note.classList.add("note-hidden");
      purple.classList.remove("purple");
      orange.classList.remove("orange");
      yellow.classList.remove("yellow");
      blue.classList.remove("blue");
      fav.classList.remove("fa-solid", "fa-heart");
      archive.classList.remove("fa-regular", "fa-folder");
      archive.classList.add("fa-solid", "fa-folder");
      if (fav.classList.contains("fa-solid")) {
        fav.classList.remove("fa-solid");
        fav.classList.add("fa-regular");
      }

      if (note.classList.contains("favorite")) {
        note.classList.remove("favorite");
        note.classList.add("note-hidden");
      } else if (note.classList.contains("favorite")) {
        note.classList.remove("favorite");
        note.classList.add("note-hidden");
      }
      archive.classList.remove("fa-regular");
      archive.classList.add("fa-solid");
    }
  });

  trash.addEventListener("click", () => {
    trash.classList.toggle("fa-solid", "fa-inbox");
    note.classList.toggle("trashed");
    note.classList.add("note-hidden");
    if (note.classList.contains("favorite")) {
      note.classList.remove("favorite");
      confirm("Are you sure you want to delete favorited note?");
    }
    if (note.classList.contains("archived")) {
      note.classList.remove("archived");
      confirm("Are you sure you want to delete archived note?");
    }
    purple.classList.remove("purple");
    orange.classList.remove("orange");
    yellow.classList.remove("yellow");
    blue.classList.remove("blue");
    fav.classList.remove("fa-solid", "fa-heart");
    archive.classList.remove("fa-regular", "fa-folder");
    archive.classList.remove("fa-solid", "fa-folder");
    trash.classList.remove("fa-solid", "fa-trash-can");
    icons.appendChild(recover);
    recover.classList.add("fa-solid", "fa-inbox");
    recover.style.marginLeft = "-406px";
  });

  recover.addEventListener("click", () => {
    note.classList.remove("trashed");
    note.classList.add("note-hidden");
    purple.classList.add("purple");
    orange.classList.add("orange");
    yellow.classList.add("yellow");
    blue.classList.add("blue");
    fav.classList.add("fa-regular", "fa-heart");
    archive.classList.add("fa-regular", "fa-folder");
    trash.classList.add("fa-regular", "fa-trash-can");
    icons.removeChild(recover);
    note.appendChild(icons);
  });

  blue.addEventListener("click", () => {
    note.style.backgroundColor = "#ceddff";
    note.style.border = "none";
    noteDate.style.color = "#3b3b3b";
    title.style.backgroundColor = "#ceddff";
    noteItem.style.backgroundColor = "#ceddff";
    title.style.color = "#3b3b3b";
    noteItem.style.color = "#3b3b3b";
    icons.style.color = "#3b3b3b";
    document.style.color = "#282828";
    note.style.border = "#ceddff";
  });

  orange.addEventListener("click", () => {
    note.style.backgroundColor = "#ffe4b2";
    note.style.border = "none";
    noteDate.style.color = "#3b3b3b";
    title.style.backgroundColor = "#ffe4b2";
    noteItem.style.backgroundColor = "#ffe4b2";
    title.style.color = "#3b3b3b";
    noteItem.style.color = "#3b3b3b";
    icons.style.color = "#3b3b3b";
    document.style.color = "#282828";
    note.style.border = "#ffe4b2";
  });

  yellow.addEventListener("click", () => {
    note.style.backgroundColor = "#ffffad";
    note.style.border = "none";
    noteDate.style.color = "#3b3b3b";
    title.style.backgroundColor = "#ffffad";
    noteItem.style.backgroundColor = "#ffffad";
    title.style.color = "#3b3b3b";
    noteItem.style.color = "#3b3b3b";
    icons.style.color = "#3b3b3b";
    document.style.color = "#282828";
    note.style.border = "#ffffad";
  });

  purple.addEventListener("click", () => {
    note.style.backgroundColor = "#ffbcff";
    note.style.border = "none";
    noteDate.style.color = "#3b3b3b";
    title.style.backgroundColor = "#ffbcff";
    noteItem.style.backgroundColor = "#ffbcff";
    title.style.color = "#3b3b3b";
    noteItem.style.color = "#3b3b3b";
    icons.style.color = "#3b3b3b";
    document.style.color = "#282828";
    note.style.border = "#ffbcff";
  });

  notes.appendChild(note);
  title.focus();

  title.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      noteItem.focus();
    }
  });
  saveNotesToLocalStorage();
}

addNoteBtn.addEventListener("click", createNote);
document.addEventListener("DOMContentLoaded", createNote);

search.addEventListener("input", () => {
  const searchInput = search.value.trim().toLowerCase();
  const allNotes = document.querySelectorAll(".note");

  allNotes.forEach((note) => {
    const noteTitle = note.querySelector(".title").value.toLowerCase();
    const noteItem = note.querySelector(".noteItem").value.toLowerCase();
    const isMatch =
      noteTitle.includes(searchInput) || noteItem.includes(searchInput);

    const isTrashed = note.classList.contains("trashed");
    const isArchived = note.classList.contains("archived");
    const isFavorite = note.classList.contains("favorite");

    const selectedMenuId = document.querySelector(".selected").id;

    if (
      (searchInput === "" || isMatch) &&
      ((selectedMenuId === "allNotes" && !isTrashed && !isArchived) ||
        (selectedMenuId === "favs" && isFavorite) ||
        (selectedMenuId === "archive" && isArchived) ||
        (selectedMenuId === "trash" && isTrashed))
    ) {
      note.classList.remove("note-hidden");
    } else {
      note.classList.add("note-hidden");
    }
  });
});

// Function to show notes based on selected menu item
const menuIcons = {
  favs: "<i class='fa-solid fa-heart'></i>",
  allNotes: "<i class='fa-solid fa-note-sticky'></i>",
  archive: "<i class='fa-solid fa-folder'></i>",
  trash: "<i class='fa-solid fa-trash-can'></i>",
};

document.addEventListener("DOMContentLoaded", () => {
  // Trigger click event on the default menu item (e.g., allNotesMenu)
  allNotesMenu.click();
  loadNotesFromLocalStorage();
});

function showNotesByMenuItem(menuItem) {
  const icon = menuIcons[menuItem.id];
  const heading = menuItem.innerText;
  menuHeading.innerHTML = icon + " " + heading;
  const allNotes = document.querySelectorAll(".note");
  let hasVisibleNotes = false; // Flag to track if there are any visible notes

  allNotes.forEach((note) => {
    if (
      menuItem.id === "allNotes" &&
      !note.classList.contains("trashed") &&
      !note.classList.contains("archived")
    ) {
      note.classList.remove("note-hidden");
      hasVisibleNotes = true;
    } else if (menuItem.id === "favs" && note.classList.contains("favorite")) {
      note.classList.remove("note-hidden");
      hasVisibleNotes = true;
    } else if (
      menuItem.id === "archive" &&
      note.classList.contains("archived")
    ) {
      note.classList.remove("note-hidden");
      hasVisibleNotes = true;
    } else if (menuItem.id === "trash" && note.classList.contains("trashed")) {
      note.classList.remove("note-hidden");
      hasVisibleNotes = true;
    } else {
      note.classList.add("note-hidden");
    }
  });
  // Show message if there are no visible notes
  if (
    !hasVisibleNotes &&
    !messageContainer.querySelector(".no-notes-message")
  ) {
    const message = document.createElement("p");
    message.innerHTML = `No Notes to show <i class="fa-solid fa-ghost"></i>`;

    message.classList.add("no-notes-message");
    messageContainer.appendChild(message);
  } else if (
    hasVisibleNotes &&
    messageContainer.querySelector(".no-notes-message")
  ) {
    // Remove the message if there are visible notes
    messageContainer.querySelector(".no-notes-message").remove();
  }
}

// Event listeners for menu items
favMenu.addEventListener("click", () => {
  menuHeading.style.color = "crimson";
  showNotesByMenuItem(favMenu);
  addNoteBtn.disabled = true;
});

allNotesMenu.addEventListener("click", () => {
  menuHeading.style.color = "rgb(0, 119, 255)";
  showNotesByMenuItem(allNotesMenu);
  addNoteBtn.disabled = false;
});

archiveMenu.addEventListener("click", () => {
  menuHeading.style.color = "orange";
  showNotesByMenuItem(archiveMenu);
  addNoteBtn.disabled = true;
});

trashMenu.addEventListener("click", () => {
  menuHeading.style.color = "rgb(118, 118, 118)";
  showNotesByMenuItem(trashMenu);
  addNoteBtn.disabled = true;
});

const menuItems = document.querySelectorAll(".option");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove 'selected' class from all menu items
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove("selected");
    });
    // Add 'selected' class to the clicked menu item
    item.classList.add("selected");
  });
});
