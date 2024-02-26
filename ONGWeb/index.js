document.addEventListener("DOMContentLoaded", function() {
    // Fetch the header content from header.html
    fetch('../header.html')
        .then(response => response.text())
        .then(data => {
            // Create a header element and set its content to the fetched data
            const header = document.createElement('header');
            header.innerHTML = data;

            // Append the header to the document's body or any specific element
            document.body.insertBefore(header, document.body.firstChild);
        })
        .catch(error => console.error(error));
});