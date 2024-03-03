import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-update-case',
  templateUrl: './add-update-case.component.html',
  styleUrls: ['./add-update-case.component.scss']
})
export class AddUpdateCaseComponent implements OnInit {

  form!:FormGroup;
  heading:string = '';
  mode: string = '';
  constructor(
    private _fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _matDialogRef: MatDialogRef<AddUpdateCaseComponent>,
    private afs : AngularFirestore,
    private _matsnackbar : MatSnackBar,
  ) { 
    console.log("_data", this._data);

    this.mode = this._data.mode;

    if(this.mode == 'add'){

      this.heading = 'Add Case';
      this.createForm()
      
    }else if(this.mode == 'edit'){

      this.heading = 'Edit Case';
      this.createForm(this._data.item)
      
    }else{

      this.heading = 'View Details';
      this.createForm(this._data.item)
      this.form.disable();
      
    }
 
  }

  ngOnInit(): void {
  }

  createForm(data?:any){
    this.form = this._fb.group({
      fileNo : [data?.fileNo || '', Validators.required],
      courtName : [data?.courtName || ''],
      perviousDate : [data?.perviousDate || ''],
      caseNo : [data?.caseNo || ''],
      partyName1 : [data?.partyName1 || ''],
      partyName1Bold : [data?.partyName1Bold || false],
      partyName2 : [data?.partyName2 || ''],
      partyName2Bold : [data?.partyName2Bold || false],
      caseStage : [data?.caseStage || ''],
      nextDate : [data?.nextDate || ''],
      remark : [data?.remark || ''] 
    })
  }

  applyBold(isFor:string){
    if(isFor === 'partyName1Bold'){
      this.form.get('partyName1Bold')?.setValue(true);
    }else{
      this.form.get('partyName2Bold')?.setValue(true);
    }
  }

  removeBold(isFor:string){
    if(isFor === 'partyName1Bold'){
      this.form.get('partyName1Bold')?.setValue(false);
    }else{
      this.form.get('partyName2Bold')?.setValue(false);
    }
  }

  onSubmit(){
    const param = this.form.value;
    const date = new Date();
    
    if(this._data.mode == 'edit' && this._data.item.docId){
      param['docId'] = this._data.item.docId;
      param['updateAt'] = new Date().getTime();
      
      const casesData = this.afs.collection('cases').doc(param['docId'])
      casesData.set(param)
      this._matDialogRef.close();
      this._matsnackbar.open('Case Update Successfully', 'OKAY', {duration : 4000});
      
    }else{
      
      param['docId'] = `${param.fileNo}_${date.getTime()}`;
      param['createAt'] = date.getTime();
      param['isDeleted'] = 0;
      
      console.log("form fieeld data", this.form.value);
      console.log("add case data", param); 
      const casesData = this.afs.collection('cases').doc(param['docId'])
      casesData.set(param);
      this._matDialogRef.close();
      this._matsnackbar.open('Case Added Successfully', 'OKAY', {duration : 4000});
    }
  }

}
