import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEstadisticoComponent } from './widget-estadistico.component';

describe('WidgetEstadisticoComponent', () => {
  let component: WidgetEstadisticoComponent;
  let fixture: ComponentFixture<WidgetEstadisticoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEstadisticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
