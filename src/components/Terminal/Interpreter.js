//import Text from '../../objects/Text.js';
import Text from '../../objects/Text'
import Scroll from '../../objects/Scroll'

/*  Parses text into dictionaries that can be interpreted.
    Parameters:
        body: should be full script
*/
export function parser(text){
    let lines = text.split('\n');
    let parsed_text = [];
    for(let command in lines){
        command = lines[command];
        let object = parse_line(command)
        if(object){
            switch(object.object_type.toLowerCase()){
                case 'text':
                    object = new Text(object);
                    break;
                case 'scroll':
                    object = new Scroll(object)
            }
            parsed_text.push(object);
        }
    }
    return parsed_text;
}

/* Parses a single line into a dictionary of attributes
    Parameters:
        line: The line to parse
    
    Returns:
        -1 if not valid
        else,
        Parsed dictionary of all attributes
*/
function parse_line(line){
    let colon_pos = line.search(':');
    if (colon_pos === -1) return null;
    let object_type = line.substring(0, colon_pos)
    let rest_of_line = line.substring(colon_pos+1)
    // parse using comma as delimeter, except commands in string quotes ("Sentences, like, this, aren't, seperated,")
    let argument_pairs = rest_of_line.split(/([^,]*),*/) 
    
    let argument_s = {'object_type': object_type};
    for(let index in argument_pairs){
        let equals_pos = argument_pairs[index].search('=');
        let name = argument_pairs[index].substring(0, equals_pos).trim();
        let value = argument_pairs[index].substring(equals_pos+1);
        if(name !== '' & value !==''){
            argument_s[name] = value;
        }
    }
    return argument_s
}



