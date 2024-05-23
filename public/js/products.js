const btns = document.getElementsByClassName('buttonAdd');
const logoutBtn = document.getElementById("logoutBtn");

const addProductToCart = async (pId, cId) => {
    try {
        const result = await fetch(`http://localhost:8080/api/carts/${cId}}/product/${pId}`, {
            body: JSON.stringify({
                quantity: 1
            }),
            method: 'post',
            headers: {
               'Content-Type': 'application/json' 
            }
        });
        if(result.status === 200 || result.status === 201){
            alert('Se agregó correctamente');
        }
        else{
            alert('Error, no se pudo agregar');
        }
    } catch (error) {
        alert('Error, no se pudo agregar');
    }
}

for(let btn of btns){
    btn.addEventListener('click', (event) => {
        console.log(btn.getAttribute("cart"))
        addProductToCart(btn.id, btn.getAttribute("cart"));
    });
}


logoutBtn.addEventListener('click', async(e) =>{
const result = await fetch('http://localhost:8080/api/session/logout', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    }
});
    const {redirect} = await result.json();
    window.location.href = redirect;
})