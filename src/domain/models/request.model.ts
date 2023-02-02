import React from 'react';
import {makeObservable, observable} from 'mobx';

export enum RequestType {
  REQUEST,
  TASK,
}

export class RequestModel {
  assigneeAvatar = '';
  currentTaskId: string;
  assigneeId: string;
  assigneeName: string;
  taskCommentCount = 0;
  loading: boolean;

  constructor(requestDto: RequestDto) {
    this.taskCommentCount = requestDto.taskInfo.taskCommentCount;
    this.currentTaskId = requestDto.taskInfo.taskId;
    this.assigneeId = requestDto.taskInfo.assigneeId;
    this.assigneeName = requestDto.taskInfo?.taskAssignee ?? '';
    this.loading = false;

    makeObservable(this, {
      taskCommentCount: observable,
      loading: observable,
      assigneeId: observable,
      assigneeName: observable,
      assigneeAvatar: observable,
      currentTaskId: observable,
    });
  }
}
