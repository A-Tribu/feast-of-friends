 
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#signup-fname').value.trim();
    const lastName = document.querySelector('#signup-lname').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    const allergies = document.querySelectorAll('querySelectorAll');
    let allergiesList = [];

    const getAllergies = () => {
      allergies.forEach((i) => {
        console.log(i);
      });
    }

    getAllergies();
  
    if (firstName && lastName && email && password) {
      console.log(JSON.stringify({ firstName, lastName, email, password }))
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  