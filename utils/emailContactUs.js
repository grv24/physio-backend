const contactUs = (iwantto, name, place, email, mobile, message) => `

<p>PhysioTimes</p>
   
    <p>
      I'm ${name}. ${iwantto}.
    </p>
    
    <p>
      My Mobile Number Is : ${mobile}
      I lived in : ${place}
      Email Address: : ${email}
      This is my message: ${message}
    </p>


  <p>Thanks & Regards</p>
  <p>${name}</p>
  <p>&nbsp;</p>
 
`

module.exports = contactUs;
