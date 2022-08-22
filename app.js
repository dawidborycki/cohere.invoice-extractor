const cohere = require('cohere-ai'); 
cohere.init('YOUR_API_KEY');

prompt_with_client_name =
    'Given an invoice, please return the name of the client\n\n' + 
    'Invoice: Microsoft, One Microsoft Way Redmond Washington 98052-6399 USA\nClient: Microsoft\n--\n'
     + 'Invoice: Google, 1600 Amphitheatre Parkway, Mountain View, CA USA\nClient: Google\n--\n'
     + 'Invoice: IBM, 1 New Orchard Road Armonk, New York 10504-1722 USA\nClient: IBM\n--\n'
     + 'Invoice: Apple, One Apple Park Way, Cupertino, CA 95014 USA\nClient: Apple\n--\n'
     + 'Invoice: Meta, One Hacker Way, Menlo Park, CA 94025 USA\nClient: Meta\n--\n'
     + 'Invoice: Hewlett-Packard Company, 3000 Hanover, Street Palo Alto, CA 94304-1185 USA\nClient: Hewlett-Packard\n--\n'
     + 'Invoice: Dell, 1 Dell Way, Round Rock, TX 78664 USA\nClient: Dell\n--\n'     
     + 'Invoice: Cohere, 49 Spadina St Unit 400 Toronto, ON, M5C 2J1 Canada\nClient: Cohere\n--\n'
     + 'Invoice: GitHub, 88 Colin P Kelly Junior, Street San Francisco, CA 94107 USA\nClient:';

prompt_with_city =
    'Given an invoice, please return the city name\n\n' + 
    'Invoice: Microsoft, One Microsoft Way Redmond Washington 98052-6399 USA\City: Redmond\n--\n'
     + 'Invoice: Google, 1600 Amphitheatre Parkway, Mountain View, CA USA\nCity: Mountain View\n--\n'
     + 'Invoice: IBM, 1 New Orchard Road Armonk, New York 10504-1722 USA\City: New York\n--\n'
     + 'Invoice: Apple, One Apple Park Way, Cupertino, CA 95014 USA\nCity: Cupertino\n--\n'
     + 'Invoice: Meta, One Hacker Way, Menlo Park, CA 94025 USA\City: Menlo Park\n--\n'
     + 'Invoice: Hewlett-Packard Company, 3000 Hanover Street, Palo Alto, CA 94304-1185 USA\nCity: Palo Alto\n--\n'
     + 'Invoice: Dell, 1 Dell Way, Round Rock, TX 78664 USA\nCity: Round Rock\n--\n'     
     + 'Invoice: Cohere, 49 Spadina St Unit 400 Toronto, ON, M5C 2J1 Canada\nCity: Toronto\n--\n'
     + 'Invoice: GitHub, 88 Colin P Kelly Junior Street, San Francisco, CA 94107 USA\nCity:';


(async () => { 
  const response = await cohere.generate({ 
    model: 'large', 
    prompt: prompt_with_client_name, 
    //prompt: prompt_with_city,
    max_tokens: 10, 
    temperature: 1, 
    k: 0, 
    p: 1,     
    stop_sequences: ["--"]    
  }); 
  
  // Check status code
  if(response.statusCode == 200) {  
    // Print prompt 
    console.log(`${prompt_with_client_name}`);
    //console.log(`${prompt_with_city}`);

    // Print predicted client name:  
    console.log(`Extracted client name: ${response.body.generations[0].text}`);   
    
    // Print predicted city name
    // console.log(`Extracted city name: ${response.body.generations[0].text}`);       
  }
  else {    
    // Print error message
    console.log(`An error occurred: ${response.body.message}`);
  }
})(); 