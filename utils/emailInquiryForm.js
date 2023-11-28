const inquiryForm = (nameOfCompany, contactPerson ,mobile , email , iAmInterestedIn,country, city, state, yourComments ) => `

<p>PhysioTimes</p>
   
    <p>
      I'm ${contactPerson}. ${iAmInterestedIn}.
    </p>
    
    <p>
      My Mobile Number Is : ${mobile}
      I lived in : ${city}
      Email Address: : ${email}
      This is my message: ${yourComments}
    </p>


  <p>Thanks & Regards</p>
  <p>${nameOfCompany}</p>
  <p>&nbsp;</p>
 
`

module.exports = inquiryForm;
