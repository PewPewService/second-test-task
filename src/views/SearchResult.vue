<template>
  <div>
    <div :hidden="paginatedData.length==0 || !this.existence">
      <div id="table">
        <table>
          <thead>
            <tr>
              <td>Название репозитория</td>
              <td>Владелец</td>
              <td>Количество звезд</td>
              <td>Ссылка на репозиторий:</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in paginatedData" :key="p.id">
              <td>{{p.full_name}}</td>
              <td>{{p.owner.login}}</td>
              <td>{{p.stargazers_count}}</td>
              <td><a :href="p.html_url">{{p.html_url}}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buttons">
        <input type="button" @click="prevPage" :disabled="pageNumber==0" class="prevPage">
        <input type="button" @click="share" id="share">
        <input type="button" @click="nextPage" :disabled="pageNumber >= pageCount -1" class="nextPage">
      </div>
    </div>
    <div :hidden="this.existence">
      <h3>Не удалось найти запрашиваемый репозиторий. Пожалуйста, проверьте корректность введенных данных</h3>
    </div>
    <div :hidden="this.allForks.length>0 || !this.existence">
      <h3>У запрашиваемого репозитория нет форков.</h3>
    </div>
    <div class="popup" ref="popup">ссылка скопирована в буфер обмена</div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";

export default {
  name: "searchResult",
  methods: {
    ...mapActions(['Search']),
      nextPage(){
          this.pageNumber++;
          this.$router.push({ name: 'Search', query: { repository: this.$route.query.repository, page: this.pageNumber }});
      },
      prevPage(){
        this.pageNumber--;
        this.$router.push({ name: 'Search', query: { repository: this.$route.query.repository, page: this.pageNumber }});
      },
      share(){
        const el = document.createElement('textarea');  
        el.value = window.location.href;                                 
        el.setAttribute('readonly', '');                
        el.style.position = 'absolute';                     
        el.style.left = '-9999px';                      
        document.body.appendChild(el);                  
        const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
        el.select();                                    
        document.execCommand('copy');                   
        document.body.removeChild(el);                  
        if (selected) {                                 
          document.getSelection().removeAllRanges();    
          document.getSelection().addRange(selected);   
        }

        this.$refs.popup.classList.add('popupAnimation');
      }
  },
  computed: {
    ...mapGetters(['allForks']),
    ...mapGetters(['existence']),
      pageCount(){
        let l = this.allForks.length,
          s = this.size;
      return Math.ceil(l/s);
      },
      paginatedData(){
        const start = this.pageNumber * this.size,
              end = start + this.size;
        return this.allForks.slice(start, end);
      }
    },
  data(){
    return {
      pageNumber: 0,
      size: 10,
    }
  },
  created(){
    this.pageNumber=this.$route.query.page;
    this.Search(this.$route.query.repository);
  },
  mounted(){
    let anim = this.$refs.popup;
    anim.addEventListener('animationend', () => {
      anim.classList.remove('popupAnimation');
    });
  }
}
</script>

<style>

table{
  margin-top:2rem;
  margin-bottom:2rem;
  width:100%;
  background-color: rgb(235, 240, 250);
  font-size: 1rem;
  border-collapse: collapse;
}
table thead{
  background-color: black;
}
tr{
  height: 1rem;
  border-bottom: 0.1rem #f8f9fd solid;
}
thead{
  background-color:black;
  color:whitesmoke;
  border: black 1px solid;
  font-size: 1.2rem;
  font-weight: bold;
}
tbody tr:hover{
  background-color: rgb(235, 235, 235);
}
#table{
  height: 30rem;
  overflow: auto;
}
.prevPage, .nextPage{
  background-image: url("../assets/pagination.png");
  background-repeat: round;
  width: 2rem;
  height: 2rem;
}
.prevPage{
  transform: rotate(180deg);
}
#share{
  background-image: url("../assets/share.png");
  background-repeat: round;
  margin-left: 2rem;
  margin-right: 2rem;
  width:2rem;
  height:2rem;
}
.buttons{
  text-align: center;
}
input:disabled{
  background-color: gray;
  cursor: default;
}

.popup{
  z-index: -10;
  width: fit-content;
  height: 2rem;
  opacity: 0;
  background-color: rgb(88, 230, 32);
  border:green 2px solid;
  border-radius: 5px;
  line-height: 2rem;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  vertical-align: middle;
  margin: 0 auto;
  position: fixed;
  bottom: -1rem;
  left:50%;
  transform: translate(-50%, -50%);
}

@keyframes popup{
  0% {
    opacity: 0;
    bottom: -1rem;
    z-index: 1;
  }
  25% {
    opacity: 1;
    bottom: 3rem;
    z-index: 1;
  }
  75% {
    opacity: 1;
    bottom: 3rem;
    z-index: 1;
  }
  100%{
    opacity: 0;
    bottom: -1rem;
    z-index: 1;
  }
}

.popupAnimation{
  animation-name: popup;
  animation-duration: 4s;
}

</style>