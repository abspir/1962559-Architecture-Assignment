import PySimpleGUI as sg

sg.theme("Default")
def regform(num):
    return [sg.Text(f'{num} '),sg.In(key="input",text_color="Blue",font = ('Default', 11, 'underline')),sg.Button("Open"),sg.Button("Approve"),sg.Button("Reject")]



layout = [[sg.Text('APPLICATION LINKS ')], [regform(x) for x in range(1,6)] + [[sg.Button('Back'), sg.Button('Logout')]]]

window = sg.Window('Pending - Qualifications Approval', layout,finalize= True, element_justification= "Centered")

while True:
    event,values = window.read()

    if event == "Exit" or event == sg.WIN_CLOSED:
        break 

window.close()	