import PySimpleGUI as sg

sg.theme("Default")
def regform(num):
    return [sg.Text(f'{num} '),sg.In(key="input",background_color= "Ivory"),sg.In(key="input",background_color= "Ivory"),sg.Button("Open")]



layout = [[sg.Text('                                                 NAME'),sg.Text('                                                                                             EMAIL')], [regform(x) for x in range(1,6)] + [[sg.Text('                                                                                              '),sg.Button('Back'), sg.Button('Logout')]]]
 
window = sg.Window('Enrolled Users', layout,finalize= True, element_justification= "Justified")

while True:
    event,values = window.read()

    if event == "Exit" or event == sg.WIN_CLOSED:
        break 

window.close()	