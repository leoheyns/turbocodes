<template>
  <div id="convcode">
    <b-form-select v-model="type" :options="types"></b-form-select>
    <b-form-input v-model="sourcetext" placeholder="enter source bits"></b-form-input>
    <b-form-input v-model="taptext0" placeholder="enter tap bits"></b-form-input>
    <b-form-input v-if="type=='nonsysnonrec' || type=='sysrec'" v-model="taptext1" placeholder="enter tap bits"></b-form-input>

    <p> input</p>
    <!-- {{input.map(c => c ? "1" : "0").join("")}} -->
    <p> output</p>
    <p>{{boolArrToStr(output[0])}}      {{boolArrToStr(output[1])}}</p>
  </div>
</template>

<script>
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

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
    // boolsource: function () {
    //   return this.sourcetext.split('').map(b => b==1)
    // }
    output: function() {
        let mem = Array(this.taps[0].length).fill(false)
        let ta = Array()
        let tb = Array()
        this.input.forEach(bit => {
            let s = this.step(mem, bit)
            ta.push(s.ta)
            tb.push(s.tb)
        });
        return [ta, tb]
    },
    taps: function() {
        return([this.stringToBoolArr(this.taptext0), this.stringToBoolArr(this.taptext1)])
    },
    input: function() {
        return this.stringToBoolArr(this.sourcetext)
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
                return this.stepNonSysNonRec(mem, bit)
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

      applyTap(tap, data){
        return (zip(tap, data).map(a => a[0] & a[1]).reduce((previous, current) => previous + current, false) % 2) == 1
      },

      stringToBoolArr(s){
        return s.split('').map(b => b==1)
      },

      boolArrToStr(barr){
        return barr.map(c => c ? "1" : "0").join("")
      }, 
  }
}
</script>
