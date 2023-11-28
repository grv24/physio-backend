const useraboutEmail = (iwantto, name, place, email, mobile, message  ) => `
<p>Dear ${name}</p>
    <p>
      Thank you for registering on the Physiotimes for purchasing Books or Articles <br />
      Physiotimes.com
    </p>
    <p>
      This is the final step towards the verification of your account as an
      User.
    </p>
    <p>
      Please click on the below link or copy paste this URL into your browser.
      This will confirm your registration on our application.
    </p>
    <p>
      <strong>Account Confirmation:</strong> 
      <p>You want to ${iwantto}</p>
      <h4>Your Mobile Number Is : ${mobile} </h4>
      <h4>Your Place is : ${place}</h4>
      <h4>Your message to us is ${message}</h4>
    </p>
    
  <p><strong>Email Address: </strong>${email}.</p>
  <p>
    Please use the password which was created during registration. If you do
    not remember your password,
  </p>
 
  <p>generate a new password to login into your account.</p>
  <p>
    You can change your password and other personal information by logging
    into the The Take-Chance
  </p>
  <p>Best Regards</p>
  <p>Physiotimes</p>
  <p>&nbsp;</p>
  <p>
  <strong
  >Please contact the The Take-Chance Support Team (Email
  ID:</strong
>
</p>
<p>
<strong
  >info@Take-Chance.co.il.) if you have any
  questions.
</strong>
    </p>
`;

const newsLetterEmail = (clientName) =>
  `<p>Hi ${clientName}, here you have today news.</p>`;

const forgotpasswordEmail = (token, user) => `
<p>Dear ${user.PersonalDetails.userName}</p>
    <p>Greetings from The Physio-Times!</p>
    <p>
      A request has been received to change the password for your account on
      The Physio-Times online submission and peer-review system website.
    </p>
    <p>
      To reset your password, please click on the below link or copy paste this
      URL into your browser:
    </p>
    <p>
    <strong>Account Confirmation Link:</strong> (<a
      href="https://anubhaanant.com/author/forgotpassword?token=${token}"
      >https://anubhaanant.com/author/forgotpassword?token=${token}</a
    >)
    </p>
    <p>
      <strong>NOTE: </strong>Please note this URL is only valid for 24 hours. If
      the link you&rsquo;ve clicked has expired, then please re-generate a new
      reset password link using the &lsquo;Forgot Password&rsquo; option from
      the login area.
    </p>
    <p><strong>Email Address (username):</strong> ${user.PersonalDetails.emailId}</p>
    <p>
      It is advisable to create a strong and complex password for security
      purpose with following
    </p>
    <p>characteristics:</p>
    <ul>
      <li>At least 8 characters&mdash;the more characters, the better</li>
      <li>A mixture of both uppercase and lowercase letters</li>
      <li>A mixture of letters and numbers</li>
      <li>Inclusion of at least one special character, e.g. [! @ # ? ]</li>
    </ul>
    <p>
      <strong>Roles and Journals associated to your account: </strong>You have
      an access to the following Journal with respective roles:
    </p>
    <p><strong>1</strong>. The Physio-Times Organisation.</p>
    <p>
     <a href="https://anubhaanant.com/"
     >https://anubhaanant.com/</a
     >
    </p>
    <p><strong>1</strong>. ${user.__type}</p>
    <p>
      Using the same password, you can access all accounts &amp; roles
      associated with your email address across medknow Journals on Review JOW.
    </p>
    <p>
      If you are still unable to access your account, please contact Medknow
      Tech Support Team at
    </p>
    <p>contact@physiotimes.com</p>
    <p>
      If you didn't request a password reset, please ignore this message; your
      password will not be changed.
    </p>
    <p>
      You can also visit the <strong>&lsquo;Login Help&rsquo;</strong> section
      on the log in page for more information.
    </p>
    <p>Thank you.</p>
    <p>Best Regards</p>
    <p>The Physio-Times Org. </p>
    <p>&nbsp;</p>
    <p>
      <strong
        >Please contact the The Physio-Times Tech Support Team (Email ID:
      </strong>
    </p>
    <p>
      <strong
        >contact@physitomes.com.) if you have any
        questions.</strong
      >
    </p>
`;

const adminforgotpasswordEmail = (token, user) => `
<p>Dear ${user.PersonalDetails.userName}</p>
    <p>Greetings from The Physio-Times!</p>
    <p>
      A request has been received to change the password for your account on
      The Physio-Times online submission and peer-review system website.
    </p>
    <p>
      To reset your password, please click on the below link or copy paste this
      URL into your browser:
    </p>
    <p>
    <strong>Account Confirmation Link:</strong> (<a
      href="https://admin.anubhaanant.com/reset-password?token=${token}"
      >https://admin.anubhaanant.com/reset-password?token=${token}</a
    >)
    </p>
    <p>
      <strong>NOTE: </strong>Please note this URL is only valid for 24 hours. If
      the link you&rsquo;ve clicked has expired, then please re-generate a new
      reset password link using the &lsquo;Forgot Password&rsquo; option from
      the login area.
    </p>
    <p><strong>Email Address (username):</strong> ${user.PersonalDetails.emailId}</p>
    <p>
      It is advisable to create a strong and complex password for security
      purpose with following
    </p>
    <p>characteristics:</p>
    <ul>
      <li>At least 8 characters&mdash;the more characters, the better</li>
      <li>A mixture of both uppercase and lowercase letters</li>
      <li>A mixture of letters and numbers</li>
      <li>Inclusion of at least one special character, e.g. [! @ # ? ]</li>
    </ul>
    <p>
      <strong>Roles and Journals associated to your account: </strong>You have
      an access to the following Journal with respective roles:
    </p>
    <p><strong>1</strong>. The Physio-Times Organisation.</p>
    <p>
     <a href="https://anubhaanant.com/"
     >https://anubhaanant.com/</a
     >
    </p>
    <p><strong>1</strong>. ${user.__type}</p>
    <p>
      Using the same password, you can access all accounts &amp; roles
      associated with your email address across medknow Journals on Review JOW.
    </p>
    <p>
      If you are still unable to access your account, please contact Medknow
      Tech Support Team at
    </p>
    <p>contact@physiotimes.com</p>
    <p>
      If you didn't request a password reset, please ignore this message; your
      password will not be changed.
    </p>
    <p>
      You can also visit the <strong>&lsquo;Login Help&rsquo;</strong> section
      on the log in page for more information.
    </p>
    <p>Thank you.</p>
    <p>Best Regards</p>
    <p>The Physio-Times Org. </p>
    <p>&nbsp;</p>
    <p>
      <strong
        >Please contact the The Physio-Times Tech Support Team (Email ID:
      </strong>
    </p>
    <p>
      <strong
        >contact@physitomes.com.) if you have any
        questions.</strong
      >
    </p>
`;

const verificationEmail = (token, user) => `
<p>Dear ${user.PersonalDetails.userName}</p>
    <p>
      Thank you for registering on the The Physio-Times online submission and
      peer-review system for <br />
      The Physio-Times Organisation
    </p>
    <p>
      This is the final step towards the verification of your account as an
      Author.
    </p>
    <p>
      Please click on the below link or copy paste this URL into your browser.
      This will confirm your registration on our application.
    </p>
    <p>
      <strong>Account Confirmation Link:</strong> (<a
        href="https://anubhaanant.com/author/verification?code=${token}"
        >https://anubhaanant.com/author/verification?code=${token}</a
      >)
    </p>
    <p>
      <strong>NOTE: </strong>Please note this URL is only valid for 24 hours. If
      the link you&rsquo;ve clicked has expired, then please re-generate a new
      verification link from the &lsquo;Register as an author&rsquo; area on the
      login page.
    </p>
    <p>
      Please enter the below email address as username to access the Review JOW
      at
    </p>
    <p>
      <strong>1</strong>.
      <a href="https://anubhaanant.com/"
        >https://anubhaanant.com/</a
      >
    </p>
    <p><strong>Email Address: </strong>${user.PersonalDetails.emailId}.</p>
    <p>
      Please use the password which was created during registration. If you do
      not remember your password,
    </p>
    <p>
      please click on <strong>&lsquo;Forgot Password&rsquo;</strong> option on
      the login page. You will receive a reset password link to
    </p>
    <p>generate a new password to login into your account.</p>
    <p>
      You can change your password and other personal information by logging
      into the The Physio-Times
    </p>
    <p>
      submission website and clicking on the
      <strong>&lsquo;Update Profile&rsquo;</strong> link on the menu from the
      dashboard.
    </p>
    <p>Best Regards</p>
    <p>The Physio-Times Org</p>
    <p>&nbsp;</p>
    <p>
      <strong
        >Please contact the The Physio-Times Tech Support Team (Email
        ID:</strong
      >
    </p>
    <p>
      <strong
        >contact@physiotimes.com.) if you have any
        questions.
      </strong>
    </p>
`;

module.exports = {useraboutEmail, newsLetterEmail, forgotpasswordEmail, adminforgotpasswordEmail,verificationEmail};