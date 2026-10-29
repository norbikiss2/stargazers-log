const list = document.querySelector("#starred");

if (!list) {
  console.error("The '#starred' list element was not found.");
} else {
  list.setAttribute("aria-busy", "true");

  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load events.json (${response.status})`);
      }

      return response.json();
    })
    .then((events) => {
      list.innerHTML = "";

      if (!Array.isArray(events) || events.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No starred repositories yet.";
        list.appendChild(emptyItem);
        return;
      }

      events.forEach((event) => {
        const item = document.createElement("li");
        item.textContent = `${event.name} — starred ${event.starred}`;
        list.appendChild(item);
      });
    })
    .catch((error) => {
      console.error(error);

      list.innerHTML = "";
      const errorItem = document.createElement("li");
      errorItem.textContent = "Unable to load starred repositories right now.";
      list.appendChild(errorItem);
    })
    .finally(() => {
      list.setAttribute("aria-busy", "false");
    });
}
