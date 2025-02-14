```mermaid
sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: User clicks "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser redraws the notes by simply adding the new note to the list in the frontend
```