<?php

namespace App\Enums;

enum TodoStatusEnum: string
{
    case NA = 'N/A';
    case New = 'New';
    case InProgress = 'In-progress';
    case Pending = 'Pending';
    case Canceled = 'Canceled';
    case Complete = 'Complete';
}
