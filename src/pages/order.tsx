import Layout from "../components/Layout";

function Order() {
  return <>
    <form>
      <fieldset>
        <legend>Your Info</legend>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

      </fieldset>
      <fieldset>
        <legend>Menu</legend>
      </fieldset>
      <fieldset>
        <legend>Order</legend>
      </fieldset>
    </form>
  </>
}
export default Order;