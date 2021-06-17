import time as timer;

def canRun(time) : #time -> array 
    return int(time[1]) < 60 and int(time[2]) < 60;

def countDown(time) :
    hr = time[0]; minute = time[1]; sec = time[2]
    totalTime = int(hr)*3600 + int(minute)*60 + int(sec)
    while totalTime :
        printNum(totalTime)
        timer.sleep(1)
        totalTime-=1
    print("___ ___ _ _  __          _    ")
    print(" |   |  ||| |__     | | |_|  |")
    print(" |  _|_ ||| |__     |_| |    ·")

def printNum(totalTime) :
    hr=str(totalTime//3600);minute=str(totalTime//60%60);sec=str(totalTime%60)
    if(len(hr)<2) :
        hr = '0' + hr
    if(len(minute)<2) :
        minute = '0' + minute
    if(len(sec)<2) :
        sec = '0' + sec
    timeStr = hr + minute + sec;
    #the first line
    for nChar in range(6) :
        for j in range(3) :
            if(j==1) :
                if(timeStr[nChar] in "02356789") :
                    print("_",end="")
                else :
                    print(" ",end="")
            else :
                print(" ",end="")
        if(nChar%2!=0 and nChar<5) :
            print("   ",end="")
        else :
            print(" ",end="")
    
    #new line
    print()

    #the second line
    for nChar in range(6) :
        for j in range(3) :
            if(j==0) :
                if(timeStr[nChar] in "045689") :
                    print("|",end="")
                else :
                    print(" ",end="")
            elif(j==1) :
                if(timeStr[nChar] in "2345689") :
                    print("_",end="")
                else :
                    print(" ",end="")
            else :
                if(timeStr[nChar] in "01234789") :
                    print("|",end="")
                else :
                    print(" ",end="")
        if(nChar%2!=0 and nChar<5) :
            print(" · ",end="")
        else :
            print(" ",end="")
    
    #new line
    print()

    #the third line
    for nChar in range(6) :
        for j in range(3) :
            if(j==0) :
                if(timeStr[nChar] in "0268") :
                    print("|",end="")
                else :
                    print(" ",end="")
            elif(j==1) :
                if(timeStr[nChar] in "0235689") :
                    print("_",end="")
                else :
                    print(" ",end="")
            else :
                if(timeStr[nChar] in "013456789") :
                    print("|",end="")
                else :
                    print(" ",end="")
        if(nChar%2!=0 and nChar<5) :
            print(" · ",end="")
        else :
            print(" ",end="")
    
    #new line
    print()


def printNull() :

    #the first line
    for i in range(6) :
        for j in range(3) :
            print(" ",end="")
        if(i%2!=0 and i<5) :
            print("   ",end="")
        else :
            print(" ",end="")

    #new line
    print()

    #the second line
    for i in range(6) :
        for j in range(3) :
            print(" ",end="")
        if(i%2!=0 and i<5) :
            print(" · ",end="")
        else :
            print(" ",end="")

    #new line
    print()

    #the third line
    for i in range(6) :
        for j in range(3) :
            if(j==1) :
                print("_",end="")
            else :
                print(" ",end="")
        if(i%2!=0 and i<5) :
            print(" · ",end="")
        else :
            print(" ",end="")

time = input().split(":")
if(canRun(time)) :
    countDown(time)
else :
    printNull()