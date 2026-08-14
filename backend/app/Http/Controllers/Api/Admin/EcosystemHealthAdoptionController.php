<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\EcosystemHealthAdoptionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EcosystemHealthAdoptionController extends Controller
{
    public function __construct(private EcosystemHealthAdoptionService $service) {}
    private function view(Request$r):void{abort_unless($r->user()->hasPermission('ecosystem.modules.view'),403);}
    public function dashboard(Request$r):JsonResponse{$this->view($r);return response()->json(['success'=>true,'dashboard'=>$this->service->dashboard($r)]);}
    public function modules(Request$r):JsonResponse{$this->view($r);return response()->json(['success'=>true,'modules'=>$this->service->registry($r)]);}
    public function trends(Request$r):JsonResponse{$this->view($r);return response()->json(['success'=>true,'series'=>$this->service->trends($r)]);}
    public function export(Request$r):JsonResponse{$this->view($r);return response()->json(['source'=>'database_and_health_checks','generatedAt'=>now()->toIso8601String(),'dashboard'=>$this->service->dashboard($r),'modules'=>$this->service->registry($r),'series'=>$this->service->trends($r)]);}
}
