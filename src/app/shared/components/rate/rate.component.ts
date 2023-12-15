import {Component, Input, OnInit} from '@angular/core';
import {ArrayUtils} from "../../../utils/array.utils";

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input({required: true})
  rates!: number[];

  stars!: string[];

  ngOnInit(): void {
    const averageRate = getAverageRate(this.rates)
    this.stars = ArrayUtils.generate(5, "matStarBorder")
      .map((it, index) => {
        return averageRate > index ? averageRate < index + 1 ? "matStarHalf" : "matStarOutline" : it;
      })
  }


}



function getAverageRate(rates: number[]) {

  // this is an easy way to count average rates
  return rates
    .map(it => it > 5 ? 5 : it)
    .reduce((sum, c) => sum += c, 0) / 5
}
