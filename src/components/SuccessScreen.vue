<template>
  <div>
    <div class="success-screen" v-bind:class="{'success-screen--show' : showScreen}">
      <div>
        <div>
          <h1 class="success-screen__header" v-bind:class="{'success-screen__header--show' : showHeader}">Taotlus on edukalt esitatud.</h1>
        </div>
        <div>
          <svg id="successAnimation" v-bind:class="{'animated': showScreen}" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
            <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
            <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="3" stroke-linecap="round" fill="transparent"/>
            <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
          </svg>
        </div>
        <div class="success-screen__actions" v-bind:class="{'success-screen__actions--show' : showActions}">
          <md-button class="md-raised">TAGASI PEALEHELE</md-button>
          <md-button class="md-raised md-primary">MINU TAOTLUSED</md-button>
        </div>
      </div>
    </div>
    <div class="toast" v-bind:class="{'toast--show' : showToast}">
      <div class="toast__content">
        <div class="toast__header">Täname!</div>
        <div class="toast__sub-header">Vajadusel võetakse Teiega ühendust <b>30</b> päeva jooksul.</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SuccessScreen',
    data: () => ({
      showScreen: false,
      showHeader: false,
      showActions: false,
      showToast: false
    }),
    methods: {
      initializeEffect() {
        this.showScreen = true;

        setTimeout(() => {
          this.showHeader = true;
        }, 500);

        setTimeout(() => {
          this.showActions = true;
        }, 1000);

        setTimeout(() => {
          this.showToast = true;
        }, 1500)
      }
    },
  }
</script>

<style lang="scss" scoped>

  $circle-length: 151px;
  $check-length: 36px;

  .success-screen {
    background: #4CAF50;
    color: white;
    align-items: center;
    justify-content: center;
    height: 100%;
    opacity: 0;
    transition: all 1s;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    display: none;
  }

  .success-screen--show {
    opacity: 1;
    display: flex;
  }

  .success-screen__header {
    text-align: center;
    z-index: 1;
    font-size: 50px;
    transition: all .4s;
    transform: translate3d(0, 25px, 0);
    opacity: 0;
    position: relative;
    line-height: 0.9;

    @media (max-width: 980px) {
      margin-bottom: 10px;
    }

  }

  .success-screen__actions {
    transition: all .5s;
    opacity: 0;

    @media (min-width: 980px) {
      margin-top: 30px;
    }

    > button[type="button"] {
      width: 150px !important;
    }
  }

  .success-screen__actions--show {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .success-screen__header--show {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .toast {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 20px;
    background: #f4f7f9;
    transform: translate3d(0, 150px, 0);
    transition: all 1s;
  }

  .toast--show {
    transform: translate3d(0, 0, 0)
  }
  .toast__content {
    max-width: 360px;
    margin: 0 auto;
  }
  .toast__header {
    font-size: 20px;
    margin: 0 0 20px;
    color: #29313d;
  }

  .toast__sub-header {
    color: #585858;
  }

  .toast__sub-sub-header {
    font-size: 10px;
    color: #ababab;
  }

  .form--hide {
    opacity: 0;
  }


  @keyframes scaleAnimation {
    0% {
      opacity: 0;
      transform: scale(1.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes drawCircle {
    0% {
      stroke-dashoffset: $circle-length;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes drawCheck {
    0% {
      stroke-dashoffset: $check-length;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  #successAnimation {
    height: 100px;
    width: 100px;
  }

  #successAnimationCircle {
    stroke-dasharray: $circle-length $circle-length;
    stroke: #FFF;
    opacity: 0;
  }

  #successAnimationCheck {
    stroke-dasharray: $check-length $check-length;
    stroke: #FFF;
  }

  #successAnimationResult {
    fill: #FFF;
    opacity: 0;
  }

  #successAnimation.animated {
    animation: 1s ease-out 0s 1 both scaleAnimation;
    opacity: 1;

    #successAnimationCircle {
      animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both drawCircle,
      0.3s linear 0.9s 1 both fadeOut;
    }

    #successAnimationCheck {
      animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both drawCheck,
      0.3s linear 0.9s 1 both fadeOut;
    }

    #successAnimationResult {
      animation: 0.3s linear 0.9s both fadeIn;
    }
  }
</style>
