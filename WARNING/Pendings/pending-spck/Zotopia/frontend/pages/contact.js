export default function Contact() {
  const registerUser = async event => {
    event.preventDefault()

    const res = await fetch('/api/register', {
    //   
      method: 'GET'
    })

    const result = await res.json()
    // result.user => 'Ada Lovelace'
  }
  
  
  
// Return
    return (
        <>
        <h1 className="">
            Hello About
        </h1>
        <form onSubmit={registerUser}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
          <button type="submit">Register</button>
        </form>
        {console.log(registerUser.result)}
        </>
      )
};