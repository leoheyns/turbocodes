<template>
  <div class="convcode">
    <b-form-select v-model="type" :options="types"></b-form-select>
    <b-form-input v-model="sourcetext" placeholder="enter source bits"></b-form-input>
    <b-form-input v-model="taptext0" placeholder="enter tap bits"></b-form-input>
    <b-form-input v-if="type=='nonsysnonrec' || type=='sysrec'" v-model="taptext1" placeholder="enter tap bits"></b-form-input>
    <b-button @click="newGetTrellis()">doe spul</b-button>
    <p> input</p>
    {{sourcetext}}
    <p> output</p>
    <p>{{boolArrToStr(output[0])}}      {{boolArrToStr(output[1])}}</p>
    <trellis :trellis="trellis" />
    <viterbi/>
  </div>
</template>

<script>
import viterbi from "@/components/viterbi";

const zip = (a, b) => a.map((k, i) => [k, b[i]]);
import trellis from '@/components/trellis'

import {Edge, Node, Trellis} from "@/decoding/viterbi";


// todo @ leo: example usage of the above classes. For simplicity in the example, the state represents past inputs
let node0 = new Node(0, '0000')
let node1 = new Node(1, '0001')
let node2 = new Node(1, '0000')
let node3 = new Node(2, '0000')

let nodes = [node0, node1, node2, node3]


let edge01 = new Edge('0', '00', node0, node1)
let edge02 = new Edge('1', '11', node0, node2)
let edge13 = new Edge('1', '11', node1, node3)
let edge23 = new Edge('0', '11', node2, node3)

let edges = [edge01, edge02, edge13, edge23]


export default {
  name: 'convcode',
  data() {return {
    type:"sysnonrec",
    types: [
        "sysnonrec",
        "nonsysnonrec",
        "sysrec"
        ],
    sourcetext: "",
    taptext0: "",
    taptext1: "",
  }},
  computed: {
    memlenght: function() {
      return this.taps[0].length
    },
    output: function() {
        let mem = Array(this.memlenght).fill(0)
        let ta = Array()
        let tb = Array()
        this.input.forEach(bit => {
            let s = this.step(mem, bit)
            ta.push(s.ta)
            tb.push(s.tb)
        });
        this.terminate(mem, ta, tb)
        return [ta, tb]
    },
    taps: function() {
        return([this.stringToBoolArr(this.taptext0), this.stringToBoolArr(this.taptext1)])
    },
    input: function() {
        return this.stringToBoolArr(this.sourcetext)
    },
    nodes: function() {
      return nodes
    },
    edges: function() {
      return edges
    },
    trellis: function() {
      return this.newGetTrellis()
    }

  },
  methods: {
      step(mem, bit){
        switch (this.type) {
            case 'sysnonrec':
                return this.stepSysNonRec(mem, bit)
            case 'nonsysnonrec':
                return this.stepNonSysNonRec(mem, bit)
            case 'sysrec':
                return this.stepSysRec(mem, bit)
        }
      },
      stepSysNonRec(mem, bit){
        mem.push(bit)
        mem.shift()
        return({ta: bit, tb: this.applyTap(this.taps[0], mem)})
      },
      stepNonSysNonRec(mem, bit){
        mem.push(bit)
        mem.shift()
        return({ta: this.applyTap(this.taps[0], mem), tb: this.applyTap(this.taps[1], mem)})
      },

      stepSysRec(mem, bit){
        mem.shift()
        mem.push(this.applyTap(this.taps[0], mem.concat([bit])))
        return({ta: bit, mem, tb: this.applyTap(this.taps[1], mem)})
      },
      terminate(mem, ta, tb){
        for (let i = 0; i < mem.length; i++) {
          let bit = 0
          if(this.type == 'sysrec'){
            let bit = this.applyTap(this.taps[0], mem.slice(1).concat([bit]))
          }
          let s = this.step(mem, bit)
          ta.push(s.ta)
          tb.push(s.tb)
        }
      },

      applyTap(tap, data){
        return zip(tap, data).map(a => a[0] & a[1]).reduce((previous, current) => previous + current, 0) % 2
      },

      stringToBoolArr(s){
        return s.split('').map(b => parseInt(b))
      },

      boolArrToStr(barr){
        return barr.map(c => c ? "1" : "0").join("")
      },
      getTrellisDict(){
        //input:u, output:x
        let dict = {}
        for(let i=0; i< 2 ** this.memlenght; i++){
          let num = i
          let mem = []
          for(let j=0; j<this.memlenght; j++) {
            mem.push((num & 1))
            num >>= 1
          }
          dict[mem] = {}
          dict[mem].one = {u:1}
          dict[mem].zero = {u:0}

          let mem_copy = mem.slice()
          dict[mem].zero.x = this.step(mem_copy, 0)
          dict[mem].zero.nextmem = mem_copy

          mem_copy = mem.slice()
          dict[mem].one.x = this.step(mem_copy, 1)
          dict[mem].one.nextmem = mem_copy

        }
        return dict
      },
      getTrellis(){
        let trellis = []
        let tdict = this.getTrellisDict()
        let memset = {}
        let init = Array(this.memlenght).fill(0)
        memset[init] = init
        for (let i = 0; i < this.output[0].length; i++){
          let tdict_layer = {}
          let tdict_copy = JSON.parse(JSON.stringify(tdict))
          let newmemset = {}
          Object.values(memset).forEach(element => {
            tdict_layer[element] = tdict_copy[element]
            if(i >= this.output[0].length - this.memlenght){
              if(tdict_layer[element].one.nextmem.slice(-1)){
                delete tdict_layer[element].one
              } else {
                delete tdict_layer[element].zero
              }
            }
            if( "one" in tdict_layer[element]){
              newmemset[tdict_layer[element].one.nextmem] = tdict_layer[element].one.nextmem
            }
            if( "zero" in tdict_layer[element]){
              newmemset[tdict_layer[element].zero.nextmem] = tdict_layer[element].zero.nextmem
            }

          });
          memset = newmemset
          trellis.push(tdict_layer)
        }
        console.log(trellis)
      },
      newGetTrellis(){
        let times = []
        let tdict = this.getTrellisDict()
        times[0] = [new Node(0, Array(this.memlenght + 1).join("0"))]
        edges = []
        for (let i = 0; i < this.output[0].length; i++){
          let nextNodes = {}
          times[i].forEach(node => {
            let tdict_node = tdict[this.stringToBoolArr(node.state)]
            let forward_edges = []
            if(i >= this.output[0].length - this.memlenght){
              if(!tdict_node.one.nextmem.slice(-1)[0]){
                forward_edges = [tdict_node.one]
              } else {
                forward_edges = [tdict_node.zero]
              }
            } else {
              forward_edges = [tdict_node.one, tdict_node.zero]
            }
            
            forward_edges.forEach(edge => {
              if(!(edge.nextmem in nextNodes)){
                nextNodes[edge.nextmem] = new Node(i + 1, this.boolArrToStr(edge.nextmem))
              }
              edges.push(new Edge(edge.u, edge.x, node, nextNodes[edge.nextmem]))
            });
          });
          times.push(Object.values(nextNodes))
        }
        return new Trellis([].concat.apply([], times), edges)
      },
  },
  components: {
    trellis,
    viterbi,
  }
  }
</script>

<style scoped>
.convcode {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
}

</style>
