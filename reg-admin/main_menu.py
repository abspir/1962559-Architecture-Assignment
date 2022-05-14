import PySimpleGUI as sg

sg.theme("Default")

layout = [

    [
        sg.Text("Email:       "),
        sg.InputText(text_color="gray"),                                      
    ],
    [
        sg.Text("Password:"),
        sg.InputText(text_color="gray")                                       
    ],
    
    [
        sg.Button("Login"),
        sg.Button("Exit", key="Exit")
     
    ]                                               
]


window = sg.Window("State University Desktop Portal", layout, finalize= True, element_justification= "Centered")


while True:
    event,values = window.read()

    if event == "Exit" or event == sg.WIN_CLOSED:
        break 

window.close()