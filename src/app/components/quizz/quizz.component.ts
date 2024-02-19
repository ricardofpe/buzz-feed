import { Component, OnInit } from '@angular/core';
import quizzquestions from '../../../assets/data/quizz-questions.json'
import { Router } from '@angular/router';
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""
  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""
  answerSelectedImg:any

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false


  constructor(private router: Router) { }

  ngOnInit(): void {
    if(quizzquestions){
      this.finished = false
      this.title = quizzquestions.title
      this.questions = quizzquestions.questions
      this.questionSelected = this.questions[this.questionIndex]



      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  caracterChoose(value:string){
    this.answers.push(value)
   this.nextAnswer()

  }

  async nextAnswer(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){

      this.questionSelected = this.questions[this.questionIndex]

    }else{

      const finalAnswer:string = await this.checkResult(this.answers)

      this.finished = true
      this.answerSelected = quizzquestions.results[finalAnswer as keyof typeof quizzquestions.results]
      this.answerSelectedImg = quizzquestions.resultsImg[finalAnswer as keyof typeof quizzquestions.resultsImg]

    }



  }



  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i, arr)=>{

      if(arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length )

      {

        return previous

      }else{

        return current
      }

    })

    return result

  }


}
