Math.PI;
function prime() {
    const range = [3, 10];
    const getPrimes = (min, max) => {
       const result = Array(max + 1)
       .fill(0)
       .map((_, i) => i);
       for (let i = 2; i <= Math.sqrt(max + 1); i++) {
          for (let j = i ** 2; j < max + 1; j += i) delete result[j];
       }
       return Object.values(result.slice(min));
    };
    const getRandomNum = (min, max) => {
       return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const getRandomPrime = ([min, max]) => {
       const primes = getPrimes(min, max);
       return primes[getRandomNum(0, primes.length - 1)];
    };
      
    const randomprime = [getRandomPrime(range),getRandomPrime(range),getRandomPrime(range),getRandomPrime(range)];
    return randomprime;  
}



function modulusN(){
    const primes = prime();
    ModulusN = primes[0] * primes[1] * primes[2] * primes[3];
    eulerphi = (primes[0] - 1) * (primes[1] -1) * (primes[2]-1) * (primes[3] -1) ;
    NandPhi = [ModulusN , eulerphi];

  
return NandPhi;
}

function GCD(x,y){
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function modInverse(a, m)
{
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

 function keyGeneration(){
     NandPhi = modulusN();
     console.log(NandPhi);
    e = 2;
    gcdE = GCD(e,NandPhi[1]);
    
    while(gcdE != 1 ){
        e = Math.floor(Math.random() * 122);
        gcdE = GCD(e,NandPhi[1]);
    }
    
    f=2;
    gcdF =GCD(f,NandPhi[1]);
    while(gcdF != 1 ){
        f = Math.floor(Math.random() * 122);
        gcdF = GCD(f,NandPhi[1]);
    }
    
   var d = modInverse(e,NandPhi[1]);
    var g = modInverse(f,NandPhi[1]);
    publickey = [e,f,NandPhi[0]];
    privatekey = [d,g,NandPhi[0]];
  
    
    return { publickey, privatekey };
    

}

keys = keyGeneration();
console.log('key adalah: ' , keys);

function encrypt(message){
    
     var encrypted = (((message ** keys.publickey[0])**keys.publickey[1]) % keys.publickey[2]);
     return encrypted
}
 console.log('enkripsi' , encrypt(7));

 function decrypt(encrypted){
     
    var decrypted =((( encrypted ** keys.privatekey[0] )** keys.privatekey[1]) % keys.privatekey[2]);
     return decrypted
 }
 console.log('dekripsi' , decrypt(encrypt(7)));
