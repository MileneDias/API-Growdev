import api from './api';

class App {
    constructor() {
        this.button1();
        this.button2();


        document.getElementById('bt-send2').onclick =
            (event) => this.register();

        document.getElementById('bt-send').onclick =
            (event) => this.login();

        document.getElementById('bt-send3').onclick =
            (event) => this.include();

        document.getElementById('button-addon1').onclick =
            (event) => this.pesquisa();

        document.getElementById('exit').onclick =
            (event) => this.sair();

        document.querySelectorAll('delete').onclick = 
            (event) => this.deletar(event);


        this.token = "";
        this.id = " ";

    }

    button1() {
        document.getElementById('um').onclick = (event) => {
            document.getElementById('telaLogin').style.display = 'flex';
            document.getElementById('telaSingIn').style.display = 'none';
        }
    }

    button2() {
        document.getElementById('dois').onclick = (event) => {
            document.getElementById('telaLogin').style.display = 'none';
            document.getElementById('telaSingIn').style.display = 'flex';
        }
    }

    register() {
        const name = document.getElementById('nameSingIn').value;
        const username = document.getElementById('usernameSingIn').value;
        const password = document.getElementById('passwordSingIn').value;
        const type = document.getElementById('userType').value;

        api.post('/users', {
            "name": name,
            "password": password,
            "type": type,
            "username": username
        })
            .then(r => {
                console.log(name, username, password, type);
            })
            .catch(e => alert(e.response.data.message));
    }

    login() {
        const username1 = document.getElementById('usernameLogin').value;
        const password1 = document.getElementById('passwordLogin').value;

        api.post('/login', {
            "username": username1,
            "password": password1
        })
            .then(r => {
                const { success, token } = r.data;
                alert(token);
                if (success) {
                    this.token = token;
                    this.id = r.data.user.uid;
                    document.getElementById('botoes').style.display = 'none';
                    document.getElementById('exit').style.display = 'flex';

                    //retorna sucesso no login
                    this.buscaGrowdevers();
                }
            })
            .catch(e => alert(e.response.data.message));
    }

    sair(){
        document.getElementById('exit').onclick = (event) => {
            document.getElementById('telaLista').style.display = 'none';
            document.getElementById('telaInclude').style.display = 'none';
            document.getElementById('telaPesquisa').style.display = 'none';
            document.getElementById('botoes').style.display = 'flex';
        }
    }

    include() {
        const email = document.getElementById('emailInclude').value;
        const phone = document.getElementById('phoneInclude').value;
        const program = document.getElementById('programInclude').value;
        const uid = this.id;

        api.postAutenticado('/growdevers', {
            "email": email,
            "phone": phone,
            "program": program,
            "user_uid": uid
        }, this.token)
            .then(r => {
                const { success } = r.data;
                if (success) {

                    //retorna sucesso no login
                    this.buscaGrowdevers();
                }
            })
            .catch(e => alert(e.response.data.message));
    }


    buscaGrowdevers() {
        api.getAutenticado('/growdevers', this.token)
            .then(r => {
                document.getElementById('telaLogin').style.display = 'none';
                document.getElementById('telaLista').style.display = 'flex';
                document.getElementById('telaInclude').style.display = 'flex';
                document.getElementById('telaPesquisa').style.display = 'flex';

                let html = " ";
                r.data.growdevers.forEach((gd) => {
                    html += `
                <li class="list-group-item">${gd.email}</li>
                <li class="list-group-item">${gd.phone}</li>
                <li class="list-group-item">${gd.program}</li>
                <li class="list-group-item">${gd.uid}</li>

                `
                });
                document.getElementById('telaLista').innerHTML = html;
            });
    }

    pesquisa() {
        const phone2 = document.getElementById('pesquisar').value;
        alert(phone2);

        api.getAutenticado('/growdevers/', this.token)
            .then(r => {
                let html = " ";
                r.data.growdevers.forEach((gd) => {
                    if (phone2 === gd.phone) {
                        html += `
                        <ul>
                            <li class="list-group-item">${gd.email}</li>
                            <li class="list-group-item">${gd.phone}</li>
                            <li class="list-group-item">${gd.program}</li>
                            <li class="list-group-item">${gd.uid}</li>
                            <button type="button" class="btn btn-warning" id="change">Change</button>
                            <button type="button" class="btn btn-danger" data-id="${gd.uid}" id="delete">Delete</button>
                        </ul>
                    `
                    }
                });

                document.getElementById('telaPesquisa1').style.display = 'flex';

                document.getElementById('telaPesquisa').innerHTML = html;

                document.querySelectorAll('.btn-danger').forEach(el => {
                    el.onclick = (event) => this.deletar(event);
                })

            })

    }

    deletar(event){
        //console.log(event.path);
        const uid = event.path[0].dataset.id;
        console.log(uid);

        api.delete(`/growdevers/${uid}`, this.token)
            .then(r => console.log(r.data))
            .catch(e => alert(e.response.data.message));

        this.buscaGrowdevers();
    }
}

new App();


//url base: https://growdev-test-node.herokuapp.com
//https://growdev-test-node.herokuapp.com/docs/#/Login/post_login
//https://growdev-test-node.herokuapp.com/docs/#/