export function TokenLaunchpad(){

    function createToken() {
        const name = document.getElementById('name').value;
        const symbol = document.getElementById('symbol').value;
        const imgUrl = document.getElementById('imgUrl').value;
        const supply = document.getElementById('supply').value;

        console.log({
            name, 
            symbol, 
            imgUrl, 
            supply
        });
        
    }

    return(
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'

        }}>

            <h1>Solana Token Launchpad</h1>
            <input id="name" className='inputText' type="text" placeholder="Name" /> <br />
            <input id="symbol" className='inputText' type="text" placeholder="Symbol" /> <br />
            <input id="imgUrl" className='inputText' type="text" placeholder="Image URL" /> <br />
            <input id="supply" className='inputText' type="text" placeholder="Initial Supply" /> <br />
            <button onClick={createToken} className='btn'>Create a Token</button>

        </div>
    );
}