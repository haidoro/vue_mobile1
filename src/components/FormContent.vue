<template>
  <div class="form-group">
    <h2>名前登録</h2>
    <label>User Name:</label>
    <input type="text" class="form-control" v-model="user.username">
    <label>User Email:</label>
    <input type="text" class="form-control" v-model="user.email">
    <p class="input-data">Name:{{user.username}}
    Email:{{user.email}}でOKですか？</p>
    <button class="btn" @click="submit">Submit</button>
    <hr>
    <button class="btn" @click="fetchData">Get Data</button>
    <ul class="list-group">
      <li class="list-item" v-for="i in users">Name:{{i.username}} Email:{{i.email}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'FormContent',
  data(){
    return{
      user:{
        username:'',
        email:''
      },
      users:[]
    }
  },
  methods:{
    submit(){
      this.$http.post('',this.user)
        .then(response =>{
            console.log(response)
        },error=>{
            console.log(error)
        })
    },
    fetchData(){
      this.$http.get('')
        .then(response =>{
            //const data = response.json()
            return response.json()
        })
        .then(data => {
          const resultArray = []
          for (let key in data){
            resultArray.push(data[key])
          }
          this.users = resultArray
        })
    }
  }

}
</script>
<style scoped>
.list-group{
  width:300px;
  margin:auto;
}
.list-group li{
  text-align: left;
}
.input-data{
  text-align: center;
}
</style>
