import validateFormSimple from 'validate-form-simple';

/**
 * Send form data to a server using Fetch API.
 * 
 * @param {string} formId - The ID of the form to send.
 * @param {string} endpoint - The URL to send the form data to.
 */
const sendFormData = (formId, endpoint) => {
  // Validate the form before sending it
  validateFormSimple(formId);

  const form = document.getElementById(formId);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Check if the form is valid
    if (form.checkValidity()) {
      const formData = new FormData(form);
      
      fetch(endpoint, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send form data');
        }
        return response.json();
      })
      .then(data => {
        // Handle the response from the server
        console.log('Form data sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending form data:', error);
      });
    }
  });
};

export default sendFormData;
